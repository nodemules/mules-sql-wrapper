{
  const _ = require('lodash');
  const wrapper = require.main.require('main');
  const chai = require('chai');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const mapper = wrapper.Mapper;

  const TEST_DATA = require('./test.data');

  const TEST_MODEL = TEST_DATA.TEST_MODEL;
  const TEST_ROW = TEST_DATA.TEST_ROW;
  const TEST_RESULT = TEST_DATA.TEST_RESULT;
  const TEST_NUM_ROWS = TEST_DATA.TEST_NUM_ROWS;

  describe('wrapper.Mapper', () => {

    describe('load', () => {
      it('should load a model', () => {
        mapper.load(TEST_MODEL);
      });
    });

    beforeEach(() => {
      mapper.load(TEST_MODEL);
    });

    describe('getModel', () => {
      it('should return the loaded model', () => {
        let model = mapper.getModel();
        expect(model).to.deep.equal(TEST_MODEL);
      });
    });

    describe('parse', () => {
      it('should return the first (and only) result from rows', () => {
        let rows = [];
        rows.push(TEST_ROW);
        let result = mapper.parse(rows);
        expect(result).to.deep.equal(TEST_RESULT);
      });
    });

    describe('mapRows', () => {
      it('should map all the rows and return an array of objects', () => {
        let rows = [];

        for (let i = 1; i <= TEST_NUM_ROWS; i++) {
          let row = _.create(TEST_ROW);
          row.MODEL_ID = new String(Math.floor(Math.random() * 10));
          rows.push(row);
        }

        let result = mapper.mapRows(rows);
        expect(result.length).to.equal(TEST_NUM_ROWS);
        let sample = _.sample(result);
        expect(sample.id).to.be.at.within(1, 10);
        expect(sample.name).to.equal(TEST_RESULT.name);
        expect(sample.dateCreated).to.deep.equal(TEST_RESULT.dateCreated);
        expect(sample.dateModified).to.deep.equal(TEST_RESULT.dateModified);
      });
    });

  });
}
