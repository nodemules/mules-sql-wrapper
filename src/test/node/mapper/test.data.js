{

  const _ = require('lodash');
  const Relation = require.main.require('main').Relation;

  const TEST_MODEL_ID = '1';
  const TEST_MODEL_NAME = 'TEST MODEL';
  const TEST_MODEL_DESCRIPTION = 'TEST MODEL DESCRIPTION';
  const TEST_MODEL_DATE_CREATED = '1970-01-01';
  const TEST_MODEL_DATE_MODIFIED = '1970-01-01T00:00:00Z';

  const TEST_RELATED_MODEL_ID = '100';
  const TEST_RELATED_MODEL_NAME = 'TEST RELATED MODEL NAME';
  const TEST_RELATED_MODEL_DATE = '1970-01-01T00:00:00Z';
  const TEST_RELATED_MODEL_STRING = 'This is a string';
  const TEST_RELATED_MODEL_NUMBER = '90210';

  const TEST_NUM_ROWS = 10;

  const TEST_SCHEMA_REQUIRED_ERROR = /A schema is required to parse a row/;
  const TEST_SCHEMA_COLUMN_REQUIRED_ERROR = /A required column is missing/;

  const TEST_RELATED_MODEL = {
    'id': {
      column: 'RELATED_MODEL_ID',
      type: Number,
      required: true
    },
    'name': {
      column: 'NAME',
      required: true
    },
    'date': {
      column: 'DATE',
      type: Date,
      required: true
    },
    'someString': 'SOME_STRING',
    'someNumber': {
      column: 'SOME_NUMBER',
      type: Number
    }
  };

  const TEST_ONE_TO_MANY_MODEL = {
    'id': {
      column: 'ONE_TO_MANY_ID',
      type: Number,
      required: true
    },
    'name': {
      column: 'NAME',
      required: true
    },
    'modelId': {
      column: 'MODEL_ID',
      type: Number,
      required: true
    }
  };

  const TEST_MODEL = {
    'id': {
      column: 'MODEL_ID',
      type: Number,
      required: true
    },
    'name': {
      column: 'NAME',
      required: true
    },
    'description': 'DESCRIPTION',
    'dateCreated': {
      column: 'DATE_CREATED',
      type: Date,
      required: true
    },
    'dateModified': {
      column: 'DATE_MODIFIED',
      type: Date,
      required: true
    },
    'related': {
      modelName: 'RELATED',
      relation: Relation.ONE_TO_ONE,
      schema: TEST_RELATED_MODEL
    },
  };

  const TEST_MODEL_WITH_ONE_TO_MANY_RELATIONSHIP = (() => {
    let model = _.cloneDeep(TEST_MODEL);
    model.oneToMany = {
      modelName: 'ONE_TO_MANY',
      relation: Relation.ONE_TO_MANY,
      key: this.id,
      schema: TEST_ONE_TO_MANY_MODEL
    };
    return model;
  })();

  const TEST_ROW = {
    'MODEL_ID': TEST_MODEL_ID,
    'NAME': TEST_MODEL_NAME,
    'DESCRIPTION': TEST_MODEL_DESCRIPTION,
    'DATE_CREATED': TEST_MODEL_DATE_CREATED,
    'DATE_MODIFIED': TEST_MODEL_DATE_MODIFIED,
    'RELATED.RELATED_MODEL_ID': TEST_RELATED_MODEL_ID,
    'RELATED.NAME': TEST_RELATED_MODEL_NAME,
    'RELATED.DATE': TEST_RELATED_MODEL_DATE,
    'RELATED.SOME_STRING': TEST_RELATED_MODEL_STRING,
    'RELATED.SOME_NUMBER': TEST_RELATED_MODEL_NUMBER
  };

  const TEST_RESULT = {
    'id': parseInt(TEST_MODEL_ID),
    'name': TEST_MODEL_NAME,
    'description': TEST_MODEL_DESCRIPTION,
    'dateCreated': new Date(TEST_MODEL_DATE_CREATED),
    'dateModified': new Date(TEST_MODEL_DATE_MODIFIED),
    'related': {
      'id': parseInt(TEST_RELATED_MODEL_ID),
      'name': TEST_RELATED_MODEL_NAME,
      'date': new Date(TEST_RELATED_MODEL_DATE),
      'someString': TEST_RELATED_MODEL_STRING,
      'someNumber': parseInt(TEST_RELATED_MODEL_NUMBER)
    }
  };

  const TEST_RESULT_NO_MODEL = {
    'modelId': parseInt(TEST_MODEL_ID),
    'name': TEST_MODEL_NAME,
    'description': TEST_MODEL_DESCRIPTION,
    'dateCreated': new Date(TEST_MODEL_DATE_CREATED),
    'dateModified': new Date(TEST_MODEL_DATE_MODIFIED),
    'relatedDate': new Date(TEST_RELATED_MODEL_DATE),
    'relatedName': TEST_RELATED_MODEL_NAME,
    'relatedRelatedModelId': parseInt(TEST_RELATED_MODEL_ID),
    'relatedSomeNumber': parseInt(TEST_RELATED_MODEL_NUMBER),
    'relatedSomeString': TEST_RELATED_MODEL_STRING
  };

  module.exports = {
    TEST_NUM_ROWS,
    TEST_MODEL,
    TEST_MODEL_WITH_ONE_TO_MANY_RELATIONSHIP,
    TEST_ROW,
    TEST_RESULT,
    TEST_RESULT_NO_MODEL,
    ERRORS: {
      TEST_SCHEMA_REQUIRED_ERROR,
      TEST_SCHEMA_COLUMN_REQUIRED_ERROR
    }
  };

}
