{
  const wrapper = require.main.require('main');
  const chai = require('chai');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const connection = wrapper.Connection;
  const engine = wrapper.Engine;
  const configuration = require('../../resources/configuration.js');

  const TEST_DATA = require('./test.data');

  describe('Testing the DML validation funcitonality within the Engine module', () => {

    before(() => {
      connection.configure(configuration);
      connection.connect();
    });

    describe('query', () => {

      before(() => {
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
        engine.query(TEST_DATA.HELPERS.PREPARE_TABLE);
      });

      describe('allowing DML statements', () => {

        it('should allow SELECT DML', async function() {
          let result = engine.query(TEST_DATA.DML.SELECT_STMT);
          await expect(result).to.eventually.be.fulfilled;
        });

        it('should allow INSERT DML', async function() {
          let result = engine.query(TEST_DATA.DML.INSERT_STMT);
          await expect(result).to.eventually.be.fulfilled;
        });

        it('should allow UPDATE DML', async function() {
          let result = engine.query(TEST_DATA.DML.UPDATE_STMT);
          await expect(result).to.eventually.be.fulfilled;
        });

        it('should allow DELETE DML', async function() {
          let result = engine.query(TEST_DATA.DML.DELETE_STMT);
          await expect(result).to.eventually.be.fulfilled;
        });

      });

      describe('rejecting DDL statements', () => {

        it('should reject CREATE DDL', async function() {
          let result = engine.query(TEST_DATA.DDL.CREATE_TABLE);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject ALTER DLL', async function() {
          let result = engine.query(TEST_DATA.DDL.ALTER_TABLE);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject DROP DLL', async function() {
          let result = engine.query(TEST_DATA.DDL.DROP_TABLE);
          await expect(result).to.eventually.be.rejected;
        });

      });

      describe('rejecting DCL statements', () => {

        it('should reject GRANT DCL', async function() {
          let result = engine.query(TEST_DATA.DCL.GRANT_STMT);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject REVOKE DCL', async function() {
          let result = engine.query(TEST_DATA.DCL.REVOKE_STMT);
          await expect(result).to.eventually.be.rejected;
        });

      });

      describe('rejecting TCL statements', () => {

        it('should reject BEGIN TCL', async function() {
          let result = engine.query(TEST_DATA.TCL.BEGIN_STMT);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject COMMIT TCL', async function() {
          let result = engine.query(TEST_DATA.TCL.COMMIT_STMT);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject ROLLBACK TCL', async function() {
          let result = engine.query(TEST_DATA.TCL.ROLLBACK_STMT);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject SAVEPOINT TCL', async function() {
          let result = engine.query(TEST_DATA.TCL.SAVEPOINT_STMT);
          await expect(result).to.eventually.be.rejected;
        });

      });

    });

  });

}
