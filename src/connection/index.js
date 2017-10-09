{
  const _ = require('lodash');
  const mariasql = require('mariasql');

  let config = {};
  let client;

  module.exports = {

    configure: (conf) => {
      config = conf;
    },

    connect: () => {

      client = new mariasql(config.db);

      client.connect();

    },

    ready: () => {
      return new Promise((resolve, reject) => {
        var debounced = _.debounce(isClientReady, 100);

        function isClientReady(c) {
          if (c.connected) {
            debounced.cancel();
            return resolve();
          }
          if (!c.connecting) {
            debounced.cancel();
            return reject();
          }
          debounced(client);
        }
        debounced(client);
      });
    },

    query: (sql, params) => {
      return new Promise((resolve, reject) => {
        if (!sql) {
          return reject({
            message: 'A SQL string is required to perform a query'
          });
        }
        client.query(sql, params, (err, rows) => {
          if (err) {
            return reject(err);
          }
          return resolve(rows, rows.info);
        });
      });
    }

  };
}
