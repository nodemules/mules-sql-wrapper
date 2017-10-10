{
  const _ = require('lodash');

  let model;

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
    _.forEach(model, (v, k) => {
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
    load: (m) => {
      model = m;
    },
    getModel: () => {
      return model;
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
