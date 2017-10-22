{
  const fs = require('fs');
  const _ = require('lodash');
  const sqlwr = require.main.require('main');

  const mariaDbConnection = sqlwr.Connection;
  const maria = sqlwr.Engine;

  module.exports = {
    stage: (filename) => {
      return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
          if (err) {
            return reject(err);
          }
          let stmts = data.split(';');
          _.forEach(stmts, (stmt) => {
            mariaDbConnection.allowDefinitions(true);
            if (stmt && stmt.trim().length) {
              maria.run(stmt).catch((err) => {
                console.error(`Error runnig stmt: [${stmt}]`, err);
                reject(new Error('There was an error with a definition statement'));
              });
            }
            mariaDbConnection.allowDefinitions(false);
          });
          return resolve();
        });
      });
    }
  };
}
