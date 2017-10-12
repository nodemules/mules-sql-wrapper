{
  const wrapper = require.main.require('main');
  const chai = require('chai');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const MapperFactory = wrapper.MapperFactory;

  const TEST_DATA = require('./test.data');

  const TEST_MODEL = TEST_DATA.TEST_MODEL;
  const TEST_ROW = TEST_DATA.TEST_ROW;
  const TEST_RESULT = TEST_DATA.TEST_RESULT;
  const TEST_RESULT_NO_MODEL = TEST_DATA.TEST_RESULT_NO_MODEL;

  describe('wrapper.MapperFactory', () => {
    let mapperA, mapperB;

    beforeEach(() => {
      mapperA = new MapperFactory('mapperA');
      mapperB = new MapperFactory('mapperB');
    });

    afterEach(() => {
      mapperA.loadSchema();
      mapperB.loadSchema();
    });

    describe('loadSchema', () => {
      it('should exhibit instance-like behavior', () => {
        mapperA.loadSchema(TEST_MODEL);
        mapperB.loadSchema({
          'different': 'SCHEMA'
        });
        expect(mapperA.getSchema()).to.not.deep.equal(mapperB.getSchema());
      });
    });

    describe('parse', () => {
      it('should parse rows based on the schema provided from the instanced mapper', () => {
        mapperA.loadSchema(TEST_MODEL);
        mapperB.allowEmptySchema(true);
        let rows = [];
        rows.push(TEST_ROW);
        expect(mapperA.parse(rows)).to.deep.equal(TEST_RESULT);
        expect(mapperB.parse(rows)).to.deep.equal(TEST_RESULT_NO_MODEL);
      });
    });

  });
}
