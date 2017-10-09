{
  const wrapper = require.main.require('main');
  const chai = require('chai');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const connection = wrapper.Connection;
  const configuration = require('./.configuration.js');

  describe('wrapper.Connection', () => {
    describe('configure', () => {
      it('should be a function', () => {
        expect(connection.configure).to.be.a('function');
      });
      it('should accept a configuration object', () => {
        connection.configure(configuration);
      });
    });

    describe('connect', () => {
      it('should be a function', () => {
        expect(connection.connect).to.be.a('function');
      });
    });

    describe('ready', () => {
      it('should be a function', () => {
        expect(connection.ready).to.be.a('function');
      });
      it('should be a promise', () => {
        let connectionStatus = connection.ready();
        expect(connectionStatus.then).to.be.a('Function');
        expect(connectionStatus.catch).to.be.a('Function');
      });
    });

    describe('query', () => {

      connection.configure(configuration);
      connection.connect();

      it('should be a function', () => {
        expect(connection.query).to.be.a('Function');
      });


      it('should be a promise', async function() {
        let result = connection.query();
        await expect(result).to.be.a('Promise');
        await expect(result.then).to.be.a('Function');
        await expect(result.catch).to.be.a('Function');
        await expect(result).to.eventually.be.rejected;
      });

      it('should accept some SQL', async function() {
        let result = connection.query('SELECT CONNECTION_ID();');
        await expect(result).to.eventually.be.fulfilled;
        await expect(result).to.eventually.be.a('Array');
      });

    });

  });
}
