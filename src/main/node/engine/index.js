{
  const assert = require('assert');

  const mariadbConnection = require('../connection');

  const validator = require('./validator');

  module.exports = {

    query: (sql, params) => {
      return new Promise((resolve, reject) => {
        let client = mariadbConnection.getConnection();
        validator.validateDML(sql);
        client.query(sql, params, (err, rows) => {
          if (err) {
            return reject(err);
          }
          return resolve(rows, rows.info);
        });
      });
    },

    define: (sql) => {
      return new Promise((resolve, reject) => {
        assert.ok(mariadbConnection.isDefinitionAllowed(),
          `DDL is not allowed, please use Connection.allowDefintions()
          or set allowDefintions = true in your configuration `
        );
        let client = mariadbConnection.getConnection();
        validator.validateDDL(sql);
        client.query(sql, (err, rows) => {
          if (err) {
            return reject(err);
          }
          return resolve(rows, rows.info);
        });
      });
    }

  };

}
