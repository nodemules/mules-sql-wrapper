{
  const _ = require('lodash');
  const wrapper = require.main.require('main');
  const Relation = wrapper.Relation;
  const chai = require('chai');

  chai.use(require('chai-as-promised'));

  const expect = chai.expect;

  const MapperFactory = wrapper.MapperFactory;

  const StagingUtil = require('../../util/stagingUtil');

  const connection = wrapper.Connection;
  const engine = wrapper.Engine;
  const configuration = require('../../resources/configuration.js');

  const SCHEMA_PERSON = {
    'id': {
      column: 'PERSON_ID',
      type: Number,
      required: true
    },
    'firstName': 'FIRST_NAME',
    'lastName': 'LAST_NAME'
  };

  const SCHEMA_CAR = {
    'id': {
      column: 'CAR_ID',
      type: Number,
      required: true
    },
    'make': 'MAKE',
    'model': 'MODEL'
  };

  const SCHEMA_JOURNEY = {
    'id': {
      column: 'JOURNEY_ID',
      type: Number,
      required: true
    },
    'car': {
      modelName: 'CAR',
      schema: SCHEMA_CAR
    },
    'driver': {
      modelName: 'DRIVER',
      schema: SCHEMA_PERSON
    },
    'passengers': {
      modelName: 'PASSENGER',
      relation: Relation.ONE_TO_MANY,
      schema: SCHEMA_PERSON
    }
  };

  const SQL_JOURNEY_QUERY =
    `SELECT
    j.JOURNEY_ID,
    d.PERSON_ID as \`DRIVER.PERSON_ID\`,
    d.LAST_NAME as \`DRIVER.LAST_NAME\`,
    d.FIRST_NAME as \`DRIVER.FIRST_NAME\`,
    p.PERSON_ID as \`PASSENGER.PERSON_ID\`,
    p.LAST_NAME as \`PASSENGER.LAST_NAME\`,
    p.FIRST_NAME as \`PASSENGER.FIRST_NAME\`,
    c.CAR_ID as \`CAR.CAR_ID\`,
    c.MAKE as \`CAR.MAKE\`,
    c.MODEL as \`CAR.MODEL\`,
    j.DISTANCE,
    TIMEDIFF(j.END_TIME, j.START_TIME) AS ELAPSED_TIME
FROM
    PERSON d
        INNER JOIN
    JOURNEY j ON d.PERSON_ID = j.DRIVER_ID
        INNER JOIN
    CAR c ON j.CAR_ID = c.CAR_ID
        LEFT OUTER JOIN
    JOURNEY_PASSENGER jp ON j.JOURNEY_ID = jp.JOURNEY_ID
        LEFT OUTER JOIN
    PERSON p ON jp.PASSENGER_ID = p.PERSON_ID
WHERE
    j.JOURNEY_ID = 5;`;

  describe('mapper.relations integration test', () => {

    let mapper;

    before((done) => {
      let dbConfig = _.cloneDeep(configuration);
      dbConfig.db.db = 'sqlwr_test';
      connection.configure(dbConfig);
      connection.connect();
      StagingUtil.stage('./src/test/sql/RELATIONS_TEST_CREATE_SCHEMA.sql').then(() => {
        StagingUtil.stage('./src/test/sql/RELATIONS_TEST_INSERT.sql').then(done, done);
      }, done);
    });

    beforeEach(() => {
      mapper = new MapperFactory();
      mapper.loadSchema(SCHEMA_JOURNEY);
      mapper.allowEmptySchema(false);
    });

    describe('parse a one to many relationship', () => {
      it('should work hopefully at some point', async function() {
        let result = await engine.query(SQL_JOURNEY_QUERY);
        let parsed = mapper.parse(result);
        expect(parsed.id).to.be.equal(5);
        let passenger = _.sample(parsed.passengers);
        expect(passenger.lastName).to.be.equal('Wiese');
      });
    });

  });
}
