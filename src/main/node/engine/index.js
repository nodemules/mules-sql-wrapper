{
  const assert = require('assert');

  const mariadbConnection = require('../connection');

  const validator = require('./validator');

  module.exports = exports = {

    define: (sql) => {
      return new Promise((resolve, reject) => {
        assert.ok(mariadbConnection.isDefinitionAllowed(),
          `DDL is not allowed, please use Connection.allowDefintions()
          or set allowDefintions = true in your configuration `
        );
        let client = mariadbConnection.getConnection();
        validator.clean(sql);
        validator.validateDDL(sql);
        client.query(sql, (err, rows) => {
          if (err) {
            return reject(err);
          }
          return resolve(rows, rows.info);
        });
      });
    },

    query: (sql, params) => {
      return new Promise((resolve, reject) => {
        let client = mariadbConnection.getConnection();
        validator.clean(sql);
        validator.validateDML(sql);
        client.query(sql, params, (err, rows) => {
          if (err) {
            return reject(err);
          }
          return resolve(rows, rows.info);
        });
      });
    },

    run: (sql, params) => {
      return new Promise((resolve, reject) => {
        if (validator.isValidDDL(sql)) {
          return exports.define(sql).then(resolve).catch(reject);
        }
        if (validator.isValidDML(sql)) {
          return exports.query(sql, params).then(resolve).catch(reject);
        }
        reject({
          message: 'The SQL string provided is not valid DDL or DML and cannot be run.',
          sql
        });
      });
    }

  };

}
