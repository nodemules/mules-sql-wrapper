{
  const _ = require('lodash');
  const wrapper = require.main.require('main');
  const chai = require('chai');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const MapperFactory = wrapper.MapperFactory;

  const TEST_DATA = require('./test.data');

  const TEST_MODEL = TEST_DATA.TEST_MODEL;
  const TEST_ROW = TEST_DATA.TEST_ROW;
  const TEST_RESULT = TEST_DATA.TEST_RESULT;
  const TEST_NUM_ROWS = TEST_DATA.TEST_NUM_ROWS;
  const TEST_RESULT_NO_MODEL = TEST_DATA.TEST_RESULT_NO_MODEL;

  const TEST_ERRORS = TEST_DATA.ERRORS;

  describe('Testing wrapper.MapperFactory instance functionality...', () => {

    let mapper;

    beforeEach(() => {
      mapper = new MapperFactory();
      mapper.loadSchema(TEST_MODEL);
      mapper.allowEmptySchema(false);
    });

    describe('loadSchema', () => {
      it('should load a model', () => {
        mapper.loadSchema(TEST_MODEL);
      });
    });

    describe('getSchema', () => {
      it('should return the loaded model', () => {
        let model = mapper.getSchema();
        expect(model).to.deep.equal(TEST_MODEL);
      });
    });

    describe('count', () => {
      it('should return the count value', () => {
        let rows = [];
        rows.push({
          'COUNT(*)': 5
        });
        let result = mapper.count(rows);
        expect(result).to.deep.equal({
          count: 5
        });
      });

      it('should fail if there are no rows', () => {
        let rows = [];
        expect(() => mapper.count(rows)).to.throw(Error, /but \[\d\] rows were found./);
      });

      it('should fail if there is more than a single row', () => {
        let rows = [];
        rows.push({
          count: 5,
          foo: 'bar'
        });
        rows.push({
          count: 6
        });
        expect(() => mapper.count(rows)).to.throw(Error, /but \[\d\] rows were found./);
      });

      it('should fail if the row has more than one column', () => {
        let rows = [];
        rows.push({
          count: 5,
          foo: 'bar'
        });
        expect(() => mapper.count(rows)).to.throw(Error, /but more than one property was found/);
      });

      it('should fail if no count column was found', () => {
        let rows = [];
        rows.push({
          foo: 'bar'
        });
        expect(() => mapper.count(rows)).to.throw(Error, /but no valid count property was found/);
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

        let rows = _.fill(Array(TEST_NUM_ROWS), _.clone(TEST_ROW));

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
