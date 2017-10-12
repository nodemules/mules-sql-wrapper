{
  const _ = require('lodash');

  const ParserFactory = require('./parser');

  module.exports = function() {

    const Parser = new ParserFactory();

    return {
      loadSchema: (schema) => {
        Parser.setSchema(schema);
      },
      getSchema: () => {
        return Parser.getSchema();
      },
      allowEmptySchema: (allow) => {
        Parser.allowEmptySchema(allow);
      },
      count: Parser.count,
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
  };
}
