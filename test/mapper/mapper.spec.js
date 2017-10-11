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
  const TEST_RESULT_NO_MODEL = TEST_DATA.TEST_RESULT_NO_MODEL;

  const TEST_ERRORS = TEST_DATA.ERRORS;

  describe('wrapper.Mapper', () => {

    describe('loadSchema', () => {
      it('should load a model', () => {
        mapper.loadSchema(TEST_MODEL);
      });
    });

    beforeEach(() => {
      mapper.loadSchema(TEST_MODEL);
      mapper.allowEmptySchema(false);
    });

    describe('getSchema', () => {
      it('should return the loaded model', () => {
        let model = mapper.getSchema();
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
          let row = _.clone(TEST_ROW);
          row.MODEL_ID = new String(Math.floor((Math.random() * 10) + 1));
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

    describe('parse a row without a model', () => {
      it('should throw an error', () => {
        mapper.loadSchema({});
        let rows = [];
        rows.push(TEST_ROW);
        expect(() => mapper.parse(rows)).to.throw(Error, TEST_ERRORS.TEST_SCHEMA_REQUIRED_ERROR);
      });
    });

    describe('parse a row without a model, allowEmptySchema=true', () => {
      it('should return a camelCased representation of the row', () => {
        mapper.loadSchema({});
        mapper.allowEmptySchema(true);

        let rows = [];
        rows.push(TEST_ROW);
        let result = mapper.parse(rows);
        expect(result).to.deep.equal(TEST_RESULT_NO_MODEL);
      });
    });

    describe('parse a row missing a required field', () => {
      it('should throw an error', () => {
        let rows = [];
        let rowWithoutName = _.cloneDeep(TEST_ROW);
        Reflect.deleteProperty(rowWithoutName, 'NAME');
        rows.push(rowWithoutName);
        expect(() => mapper.parse(rows)).to.throw(Error, TEST_ERRORS.TEST_SCHEMA_COLUMN_REQUIRED_ERROR);
      });
    });

  });
}
