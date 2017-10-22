{
  const _ = require('lodash');
  const moment = require('moment');
  const assert = require('assert');

  const Relation = require('../relation');

  const COUNT_ERROR =
    `A count row is expected to contain only a single
  enumerable property case-insensitively matching COUNT or COUNT(*)`;

  module.exports = function() {

    let schema;
    let allowEmptySchema = false;

    function parseModelFromRow(row) {
      if (!schema) {
        schema = {};
      }
      _.forEach(row, (v, k) => {
        let type;
        if (moment(v, moment.ISO_8601, true).isValid()) {
          type = Date;
        } else if (_.isFinite(parseInt(v))) {
          type = Number;
        }
        let value = k;
        if (type) {
          value = {
            'column': k,
            'type': type
          };
        }
        schema[_.camelCase(k)] = value;
      });
    }

    function parseType(type, value) {
      switch (type) {
        case Number:
          return parseInt(value);
        case Date:
          return new Date(value);
        default:
          return value;
      }
    }

    function parse(rows, localSchema, columnPrefix) {
      let row = rows[0];
      let o = {};
      if (!localSchema && _.isEmpty(schema)) {
        assert(allowEmptySchema,
          `A schema is required to parse a row.
          Use mapper.allowEmptySchema(true) to create a dynamic schema for given rows.`
        );
        parseModelFromRow(row);
      }
      if (!localSchema) {
        localSchema = schema;
      }
      _.forEach(localSchema, (v, k) => {
        let columnName;
        if (_.isString(v)) {
          columnName = v;
          if (columnPrefix) {
            columnName = columnPrefix + '.' + columnName;
          }
          o[k] = row[columnName];
        }
        if (_.isObject(v)) {
          columnName = v.column;
          if (columnPrefix) {
            columnName = columnPrefix + '.' + columnName;
          }
          let actualRow = row[columnName];
          if (v.required) {
            assert(!!actualRow, `A required column is missing: [${v.column}]`);
          }
          if (actualRow !== undefined) {
            if (v.type) {
              o[k] = parseType(v.type, actualRow);
            } else {
              o[k] = actualRow;
            }
          }
          if (v.schema) {
            assert(v.modelName, 'A schema requires a model name');

            switch (v.relation) {
              case Relation.ONE_TO_MANY:
                var oneToManyRows = [];
                _.forEach(rows, (oneToManyRow) => {
                  oneToManyRows.push(parse([oneToManyRow], v.schema, v.modelName));
                });
                o[k] = oneToManyRows;
                break;
              case Relation.ONE_TO_ONE:
              default:
                o[k] = parse([row], v.schema, v.modelName);
                break;
            }
          }
        }
      });
      return o;
    }

    function count(rows) {
      if (!rows || !rows.length || rows.length > 1) {
        assert.fail(`${COUNT_ERROR}, but [${rows.length}] rows were found.`);
      }
      let row = rows[0];
      let count = {};
      let labels = [/^(COUNT)$/i, /^(COUNT\(.*\))$/i];
      _.forEach(labels, (label) => {
        let props = 0;
        _.forEach(row, (v, k) => {
          if (props > 0) {
            assert.fail(`${COUNT_ERROR}, but more than one property was found.`);
          }
          if (label.test(k, 'i')) {
            count.count = row[k];
          }
          props++;
        });
      });
      if (!count.count) {
        assert.fail(`${COUNT_ERROR}, but no valid count property was found.`);
      }
      return count;
    }

    return {
      count,
      parse,
      getSchema: () => {
        return schema;
      },
      setSchema: (s) => {
        schema = s;
      },
      allowEmptySchema: (allow) => {
        allowEmptySchema = allow;
      }
    };
  };
}
