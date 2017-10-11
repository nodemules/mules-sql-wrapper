{
  const _ = require('lodash');
  const moment = require('moment');

  let allowEmptySchema = false;

  let schema;

  function parseModelFromRow(row) {
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
      if (!allowEmptySchema) {
        throw 'A schema is required to parse a row. Use mapper.allowEmptySchema(true) to create a dynamic schema for given rows.';
      }
      parseModelFromRow(row);
    }
    _.forEach(schema, (v, k) => {
      if (_.isString(v)) {
        o[k] = row[v];
      }
      if (_.isObject(v)) {
        o[k] = parseType(v.type, row[v.column]);
      }
    });
    return o;
  }

  module.exports = {
    loadSchema: (s) => {
      schema = s;
    },
    getSchema: () => {
      return schema;
    },
    allowEmptySchema: (allow) => {
      allowEmptySchema = allow;
    },
    parse: (rows) => {
      if (!rows || !rows.length) {
        return {};
      }
      return parse(rows[0]);
    },
    mapRows: (rows) => {
      let results = [];
      _.forEach(rows, (row) => {
        results.push(parse(row));
      });
      return results;
    }
  };
}
