{
  module.exports = {
    HELPERS: {
      CLEAR_TABLE: 'DELETE FROM \`TEST_DB\`.\`TEST_MODEL\`',
      PREPARE_TABLE: `INSERT INTO \`TEST_DB\`.\`TEST_MODEL\` (ID, NAME)
      VALUES
      (1, \'TEST NAME 1\'),
      (2, \'TEST NAME 2\'),
      (3, \'TEST NAME 3\'),
      (4, \'TEST NAME 4\'),
      (5, \'TEST NAME 5\')`
    },
    DDL: {
      CREATE_TABLE: `CREATE TABLE \`TEST_DB\`.\`TEST_MODEL\`
      (
        ID int primary key auto_increment,
        NAME varchar(100) not null,
        DESCRIPTION varchar(1000),
        DATE datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
      ) auto_increment=0`,
      ALTER_TABLE: 'ALTER TABLE \`TEST_DB\`.\`TEST_MODEL\` modify NAME varchar(1000) not null',
      DROP_TABLE: 'DROP TABLE \`TEST_DB\`.\`TEST_MODEL\`'
    },
    DML: {
      INSERT_STMT: `INSERT INTO \`TEST_DB\`.\`TEST_MODEL\` (NAME, DESCRIPTION)
      values (\'TEST NEW NAME\', \'TEST DESCRIPTION\')`,
      UPDATE_STMT: 'UPDATE \`TEST_DB\`.\`TEST_MODEL\` SET NAME = \'TEST NAME!\' WHERE ID = 1',
      SELECT_ALL_STMT: 'SELECT ID, NAME FROM \`TEST_DB\`.\`TEST_MODEL\`',
      SELECT_STMT: 'SELECT ID, NAME FROM \`TEST_DB\`.\`TEST_MODEL\` WHERE ID = 1',
      DELETE_STMT: 'DELETE FROM \`TEST_DB\`.\`TEST_MODEL\` WHERE ID = 1'
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
