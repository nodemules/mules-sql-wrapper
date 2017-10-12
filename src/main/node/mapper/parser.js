{
  const _ = require('lodash');
  const moment = require('moment');
  const assert = require('assert');

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

    function parse(row) {
      let o = {};
      if (_.isEmpty(schema)) {
        assert(allowEmptySchema,
          `A schema is required to parse a row.
          Use mapper.allowEmptySchema(true) to create a dynamic schema for given rows.`
        );
        parseModelFromRow(row);
      }
      _.forEach(schema, (v, k) => {
        if (_.isString(v)) {
          o[k] = row[v];
        }
        if (_.isObject(v)) {
          if (v.required) {
            assert(!!row[v.column], `A required column is missing: [${v.column}]`);
          }
          if (row[v.column] !== undefined) {
            o[k] = parseType(v.type, row[v.column]);
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
      let labels = [/^(COUNT)$/, /^(COUNT\(.*\))$/];
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
