{
  const _ = require('lodash');
  const assert = require('assert');

  const DML_STATEMENTS = [
    /^SELECT/, /^INSERT/, /^UPDATE/, /^DELETE/
  ];

  const DDL_STATEMENTS = [
    /(ALTER|CREATE|DROP|RENAME|TRUNCATE)(?=.(DATABASE|TABLE|FUNCTION|INSTANCE|SERVER|LOGFILE|EVENT|PROCEDURE|VIEW|INDEX|TRIGGER|FUNCTION))/
  ];

  const DCL_STATEMENTS = [
    /GRANT/, /REVOKE/
  ];

  const TCL_STATEMENTS = [
    /BEGIN/, /COMMIT/, /ROLLBACK/, /SAVEPOINT/
  ];

  module.exports = {

    validateDML: (sql) => {
      assert.ok(sql, 'A SQL string is required to perform a query');
      let invalidStatements = [].concat(DDL_STATEMENTS).concat(DCL_STATEMENTS).concat(TCL_STATEMENTS);
      _.forEach(invalidStatements, (ddl) => {
        assert.equal(sql.match(ddl, 'i'));
      });
    },

    validateDDL: (sql) => {
      assert.ok(sql, 'A SQL string is required to perform a query');
      let invalidStatements = [].concat(DML_STATEMENTS).concat(DCL_STATEMENTS).concat(TCL_STATEMENTS);
      _.forEach(invalidStatements, (ddl) => {
        assert.equal(sql.match(ddl, 'i'));
      });
    }

  };
}
