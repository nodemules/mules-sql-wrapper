{
  const wrapper = require.main.require('main');
  const chai = require('chai');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const connection = wrapper.Connection;
  const engine = wrapper.Engine;
  const configuration = require('../../resources/configuration.js');

  const TEST_DATA = require('./test.data');

  describe('wrapper.Engine', () => {

    before(() => {
      connection.configure(configuration);
      connection.connect();
    });

    describe('query', () => {

      it('should be a function', () => {
        expect(engine.query).to.be.a('Function');
      });

      it('should be a promise', async function() {
        let result = engine.query();
        await expect(result).to.be.a('Promise');
        await expect(result.then).to.be.a('Function');
        await expect(result.catch).to.be.a('Function');
        await expect(result).to.eventually.be.rejected;
      });

      it('should accept some SQL', async function() {
        let result = engine.query('SELECT CONNECTION_ID();');
        await expect(result).to.eventually.be.fulfilled;
        await expect(result).to.eventually.be.a('Array');
      });

    });

    describe('run', () => {

      describe('allowing DML statements', () => {

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

        it('should allow SELECT DML', async function() {
          let result = engine.run(TEST_DATA.DML.SELECT_STMT);
          await expect(result).to.eventually.be.fulfilled;
        });

        it('should allow INSERT DML', async function() {
          let result = engine.run(TEST_DATA.DML.INSERT_STMT);
          await expect(result).to.eventually.be.fulfilled;
        });

        it('should allow UPDATE DML', async function() {
          let result = engine.run(TEST_DATA.DML.UPDATE_STMT);
          await expect(result).to.eventually.be.fulfilled;
        });

        it('should allow DELETE DML', async function() {
          let result = engine.run(TEST_DATA.DML.DELETE_STMT);
          await expect(result).to.eventually.be.fulfilled;
        });

      });

      describe('allowing DDL statements', () => {

        before(() => {
          connection.allowDefinitions(true);
        });

        after(() => {
          connection.allowDefinitions(false);
        });

        it('should allow CREATE DDL', async function() {
          let result = engine.run(TEST_DATA.DDL.CREATE_TABLE);
          await expect(result).to.eventually.be.fulfilled;
        });

        it('should allow ALTER DLL', async function() {
          let result = engine.run(TEST_DATA.DDL.ALTER_TABLE);
          await expect(result).to.eventually.be.fulfilled;
        });

        it('should allow DROP DLL', async function() {
          let result = engine.run(TEST_DATA.DDL.DROP_TABLE);
          await expect(result).to.eventually.be.fulfilled;
        });

      });

    });

  });
}
