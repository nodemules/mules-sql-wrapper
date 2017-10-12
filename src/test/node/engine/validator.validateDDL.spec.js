{
  const wrapper = require.main.require('main');
  const chai = require('chai');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const connection = wrapper.Connection;
  const engine = wrapper.Engine;
  const configuration = require('../../resources/configuration.js');

  const TEST_DATA = require('./test.data');
  const TEST_DDL = TEST_DATA.DDL;
  const TEST_DCL = TEST_DATA.DCL;

  describe('Testing the DDL validation funcitonality within the Engine module', () => {

    connection.configure(configuration);
    connection.connect();

    describe('define', () => {

      describe('allowing DDL statements', () => {

        it('should allow CREATE DDL', async function() {
          let result = engine.define(TEST_DDL.CREATE_TABLE);
          await expect(result).to.eventually.be.fulfilled;
        });

        it('should allow ALTER DLL', async function() {
          let result = engine.define(TEST_DDL.ALTER_TABLE);
          await expect(result).to.eventually.be.fulfilled;
        });

        it('should allow DROP DLL', async function() {
          let result = engine.define(TEST_DDL.DROP_TABLE);
          await expect(result).to.eventually.be.fulfilled;
        });

      });

      describe('rejecting DML statements', () => {

        it('should reject SELECT DML', async function() {
          let result = engine.define(TEST_DATA.DML.SELECT_STMT);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject INSERT DML', async function() {
          let result = engine.define(TEST_DATA.DML.INSERT_STMT);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject UPDATE DML', async function() {
          let result = engine.define(TEST_DATA.DML.UPDATE_STMT);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject DELETE DML', async function() {
          let result = engine.define(TEST_DATA.DML.DELETE_STMT);
          await expect(result).to.eventually.be.rejected;
        });

      });

      describe('rejecting DCL statements', () => {

        it('should reject GRANT DCL', async function() {
          let result = engine.define(TEST_DCL.GRANT_STMT);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject REVOKE DCL', async function() {
          let result = engine.define(TEST_DCL.REVOKE_STMT);
          await expect(result).to.eventually.be.rejected;
        });

      });

      describe('rejecting TCL statements', () => {

        it('should reject BEGIN TCL', async function() {
          let result = engine.define(TEST_DATA.TCL.BEGIN_STMT);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject COMMIT TCL', async function() {
          let result = engine.define(TEST_DATA.TCL.COMMIT_STMT);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject ROLLBACK TCL', async function() {
          let result = engine.define(TEST_DATA.TCL.ROLLBACK_STMT);
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject SAVEPOINT TCL', async function() {
          let result = engine.define(TEST_DATA.TCL.SAVEPOINT_STMT);
          await expect(result).to.eventually.be.rejected;
        });

      });

    });

  });

}
