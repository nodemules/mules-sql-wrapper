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

  module.exports = exports = {

    clean: (sql) => {
      assert.ok(sql, 'A SQL string is required to perform a query');
      sql.trim();
      sql.replace(/\n/gm, '');
    },

    isValidDDL: (sql) => {
      exports.clean(sql);
      let validity = false;
      _.forEach(DDL_STATEMENTS, (valid) => {
        validity = validity || valid.test(sql, 'i');
      });
      return validity;
    },

    isValidDML: (sql) => {
      exports.clean(sql);
      let validity = false;
      _.forEach(DML_STATEMENTS, (valid) => {
        validity = validity || valid.test(sql, 'i');
      });
      return validity;
    },

    validateDML: (sql) => {
      exports.clean(sql);
      let invalidStatements = [].concat(DDL_STATEMENTS).concat(DCL_STATEMENTS).concat(TCL_STATEMENTS);
      _.forEach(invalidStatements, (invalid) => {
        assert.equal(sql.match(invalid, 'i'));
      });
    },

    validateDDL: (sql) => {
      exports.clean(sql);
      let invalidStatements = [].concat(DML_STATEMENTS).concat(DCL_STATEMENTS).concat(TCL_STATEMENTS);
      _.forEach(invalidStatements, (invalid) => {
        assert.equal(sql.match(invalid, 'i'));
      });
    }

  };
}
