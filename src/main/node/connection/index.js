{
  const _ = require('lodash');
  const mariasql = require('mariasql');

  let config = {};
  let client;

  let allowDefinitions = false;

  module.exports = {

    allowDefinitions: (allow) => {
      allowDefinitions = allow;
    },

    configure: (conf) => {
      config = conf;
    },

    connect: () => {

      client = new mariasql(config.db);

      allowDefinitions = !!config.allowDefinitions;

      client.connect();

    },

    getConnection: () => client,

    isDefinitionAllowed: () => allowDefinitions,

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
    }

  };
}
