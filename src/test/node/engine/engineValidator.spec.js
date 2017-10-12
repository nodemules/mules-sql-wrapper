{
  const wrapper = require.main.require('main');
  const chai = require('chai');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const connection = wrapper.Connection;
  const engine = wrapper.Engine;
  const configuration = require('../../resources/configuration.js');

  describe('Testing the validation funcitonality within the Engine module', () => {

    connection.configure(configuration);
    connection.connect();

    describe('query', () => {

      describe('ignoring DDL statements', () => {

        it('should reject CREATE DDL', async function() {
          let result = engine.query(
            'CREATE TABLE `REJECT_DDL` (ID int primary key auto_increment) auto_increment=1');
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject ALTER DLL', async function() {
          let result = engine.query(
            'ALTER TABLE `REJECT_DDL` modify ID smallint primary key auto_increment');
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject DROP DLL', async function() {
          let ddl = 'DROP TABLE `REJECT_DDL` modify ID smallint primary key auto_increment';
          let result = engine.query(ddl);
          await expect(result).to.eventually.be.rejected;
        });

      });

      describe('ignoring DCL statements', () => {

        it('should reject GRANT DCL', async function() {
          let result = engine.query(
            'GRANT ALL PERMISSIONS ON *.* TO \'root\'@\'127.0.0.1\' WITH GRANT OPTION');
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject REVOKE DCL', async function() {
          let result = engine.query(
            'REVOKE ALL PERMISSIONS ON *.* FROM \'root\'@\'127.0.0.1\'');
          await expect(result).to.eventually.be.rejected;
        });

      });

      describe('ignoring TCL statements', () => {

        it('should reject BEGIN TCL', async function() {
          let result = engine.query('BEGIN');
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject COMMIT TCL', async function() {
          let result = engine.query('COMMIT');
          await expect(result).to.eventually.be.rejected;
        });

        it('should reject ROLLBACK TCL', async function() {
          let result = engine.query('ROLLBACK to `backup`');
          await expect(result).to.eventually.be.rejected;
        });

      });

    });

  });

}
