{
  const _ = require('lodash');

  const Parser = require('./parser');

  module.exports = {
    loadSchema: (schema) => {
      Parser.setSchema(schema);
    },
    getSchema: () => {
      return Parser.getSchema();
    },
    allowEmptySchema: Parser.allowEmptySchema,
    parse: (rows) => {
      if (!rows || !rows.length) {
        return {};
      }
      return Parser.parse(rows[0]);
    },
    mapRows: (rows) => {
      let results = [];
      _.forEach(rows, (row) => {
        results.push(Parser.parse(row));
      });
      return results;
    }
  };
}
