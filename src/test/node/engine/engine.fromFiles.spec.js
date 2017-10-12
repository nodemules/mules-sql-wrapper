{
  const wrapper = require.main.require('main');
  const chai = require('chai');
  const fs = require('fs');
  const _ = require('lodash');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const connection = wrapper.Connection;
  const engine = wrapper.Engine;
  const configuration = require('../../resources/configuration.js');
  const TEST_DATA = require('./test.data');

  function parseFile(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data.split(';'));
      });
    });
  }

  describe('wrapper.Engine', () => {

    before(() => {
      connection.configure(configuration);
      connection.connect();
      connection.allowDefinitions(true);
      engine.define(TEST_DATA.DDL.CREATE_TABLE);
      connection.allowDefinitions(false);
    });

    after(() => {
      connection.allowDefinitions(true);
      engine.define(TEST_DATA.DDL.DROP_TABLE);
      connection.allowDefinitions(false);
    });

    beforeEach(() => {
      engine.query(TEST_DATA.HELPERS.CLEAR_TABLE);
    });

    describe('test some inserts', async function() {
      let statements;

      before((done) => {
        statements = [];
        parseFile('./src/test/sql/INSERT_TEST.sql').then((stmts) => {
          _.forEach(stmts, (stmt) => {
            if (stmt && stmt.trim().length) {
              statements.push(stmt);
            }
          });
          done();
        }, done);
      });

      it('should not throw a damn error', async function() {
        let result = engine.run(statements[0]);

        await expect(result).to.eventually.be.fulfilled;
      });
    });

  });
}
