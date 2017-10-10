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

  });
}
