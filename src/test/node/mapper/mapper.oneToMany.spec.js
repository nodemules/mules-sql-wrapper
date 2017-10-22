{
  const _ = require('lodash');
  const wrapper = require.main.require('main');
  const chai = require('chai');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const MapperFactory = wrapper.MapperFactory;

  const TEST_DATA = require('./test.data');

  const TEST_MODEL = TEST_DATA.TEST_MODEL_WITH_ONE_TO_MANY_RELATIONSHIP;
  const TEST_ROW = TEST_DATA.TEST_ROW;
  const TEST_RESULT = TEST_DATA.TEST_RESULT;
  const TEST_NUM_ROWS = TEST_DATA.TEST_NUM_ROWS;

  describe('mapper.oneToMany', () => {

    let mapper;

    beforeEach(() => {
      mapper = new MapperFactory();
      mapper.loadSchema(TEST_MODEL);
      mapper.allowEmptySchema(false);
    });

    describe('parse a one to many relationship', () => {
      it('should work hopefully at some point', () => {
        let rows = [];

        for (let i = 0; i < TEST_NUM_ROWS; i++) {
          let row = _.clone(TEST_ROW);
          row['ONE_TO_MANY.ONE_TO_MANY_ID'] = i + 1;
          row['ONE_TO_MANY.NAME'] = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
          row['ONE_TO_MANY.MODEL_ID'] = row.MODEL_ID;
          rows.push(row);
        }

        let result = mapper.parse(rows);
        expect(result.id).to.equal(TEST_RESULT.id);
        expect(result.oneToMany).to.have.property('length', TEST_NUM_ROWS);
        let oneToManySample = _.sample(result.oneToMany);
        expect(oneToManySample.modelId).to.equal(TEST_RESULT.id);
        expect(oneToManySample.name).to.be.a.string;
        expect(oneToManySample.name).to.have.lengthOf(5);
      });
    });

  });
}
