{
  const _ = require('lodash');
  const moment = require('moment');
  const assert = require('assert');

  let schema;
  let allowEmptySchema = false;

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
        let defined = !!row[v.column];
        if (v.required) {
          assert(defined, `A required column is missing: [${v.column}]`);
        }
        if (defined) {
          o[k] = parseType(v.type, row[v.column]);
        }
      }
    });
    return o;
  }

  module.exports = {
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
}
