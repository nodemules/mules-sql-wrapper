{
  module.exports = {
    HELPERS: {
      CLEAR_TABLE: 'DELETE FROM \`TEST_DB\`.\`TESTING_DATA\`',
      PREPARE_TABLE: `INSERT INTO \`TEST_DB\`.\`TESTING_DATA\` (ID, NAME)
      VALUES
      (1, \'TEST NAME 1\'),
      (2, \'TEST NAME 2\'),
      (3, \'TEST NAME 3\'),
      (4, \'TEST NAME 4\'),
      (5, \'TEST NAME 5\')`
    },
    DDL: {
      CREATE_TABLE: `CREATE TABLE \`TEST_DB\`.\`TESTING_DATA\`
      (ID int primary key auto_increment, NAME varchar(100) not null) auto_increment=0`,
      ALTER_TABLE: 'ALTER TABLE \`TEST_DB\`.\`TESTING_DATA\` modify NAME varchar(1000) not null',
      DROP_TABLE: 'DROP TABLE \`TEST_DB\`.\`TESTING_DATA\`'
    },
    DML: {
      INSERT_STMT: 'INSERT INTO \`TEST_DB\`.\`TESTING_DATA\` (NAME) VALUES (\'TEST NAME\')',
      UPDATE_STMT: 'UPDATE \`TEST_DB\`.\`TESTING_DATA\` SET NAME = \'TEST NAME!\' WHERE ID = 1',
      SELECT_ALL_STMT: 'SELECT ID, NAME FROM \`TEST_DB\`.\`TESTING_DATA\`',
      SELECT_STMT: 'SELECT ID, NAME FROM \`TEST_DB\`.\`TESTING_DATA\` WHERE ID = 1',
      DELETE_STMT: 'DELETE FROM \`TEST_DB\`.\`TESTING_DATA\` WHERE ID = 1'
    },
    DCL: {
      GRANT_STMT: 'GRANT ALL PERMISSIONS ON *.* TO \'root\'@\'127.0.0.1\' WITH GRANT OPTION',
      REVOKE_STTMT: 'REVOKE ALL PERMISSIONS ON *.* FROM \'root\'@\'127.0.0.1\''
    },
    TCL: {
      BEGIN_STMT: 'BEGIN',
      COMMIT_STMT: 'COMMIT',
      ROLLBACK_STMT: 'ROLLBACK to \`backup\`',
      SAVEPOINT_STMT: 'SAVEPOINT \`backup\`'
    }
  };
}
