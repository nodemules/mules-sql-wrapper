{

  const TEST_MODEL_ID = '1';
  const TEST_MODEL_NAME = 'TEST MODEL';
  const TEST_MODEL_DESCRIPTION = 'TEST MODEL DESCRIPTION';
  const TEST_MODEL_DATE_CREATED = '1970-01-01';
  const TEST_MODEL_DATE_MODIFIED = '1970-01-01T00:00:00Z';

  const TEST_NUM_ROWS = 10;

  const TEST_SCHEMA_REQUIRED_ERROR = /A schema is required to parse a row/;
  const TEST_SCHEMA_COLUMN_REQUIRED_ERROR = /A required column is missing/;

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
    }
  };

  const TEST_ROW = {
    'MODEL_ID': TEST_MODEL_ID,
    'NAME': TEST_MODEL_NAME,
    'DESCRIPTION': TEST_MODEL_DESCRIPTION,
    'DATE_CREATED': TEST_MODEL_DATE_CREATED,
    'DATE_MODIFIED': TEST_MODEL_DATE_MODIFIED
  };

  const TEST_RESULT = {
    'id': parseInt(TEST_MODEL_ID),
    'name': TEST_MODEL_NAME,
    'description': TEST_MODEL_DESCRIPTION,
    'dateCreated': new Date(TEST_MODEL_DATE_CREATED),
    'dateModified': new Date(TEST_MODEL_DATE_MODIFIED)
  };

  const TEST_RESULT_NO_MODEL = {
    'modelId': parseInt(TEST_MODEL_ID),
    'name': TEST_MODEL_NAME,
    'description': TEST_MODEL_DESCRIPTION,
    'dateCreated': new Date(TEST_MODEL_DATE_CREATED),
    'dateModified': new Date(TEST_MODEL_DATE_MODIFIED)
  };

  module.exports = {
    TEST_NUM_ROWS,
    TEST_MODEL,
    TEST_ROW,
    TEST_RESULT,
    TEST_RESULT_NO_MODEL,
    ERRORS: {
      TEST_SCHEMA_REQUIRED_ERROR,
      TEST_SCHEMA_COLUMN_REQUIRED_ERROR
    }
  };

}
