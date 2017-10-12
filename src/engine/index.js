{

  const mariadbConnection = require('../connection');

  module.exports = {

    query: (sql, params) => {
      return new Promise((resolve, reject) => {
        let client = mariadbConnection.getConnection();
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
