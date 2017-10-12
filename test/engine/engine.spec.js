{
  const wrapper = require.main.require('main');
  const chai = require('chai');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const connection = wrapper.Connection;
  const engine = wrapper.Engine;
  const configuration = require('../.configuration.js');

  describe('wrapper.Engine', () => {

    describe('query', () => {

      connection.configure(configuration);
      connection.connect();

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

  });
}
