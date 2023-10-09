/// <reference types='Cypress'/>
// const oracledb = require('oracledb');

// const configOracle = {
//   user: 'hr',
//   password: 'hr',
//   connectString: 'DESKTOP-N9JJ1IP:1521/XEPDB1',
// };

describe('SQL DB request', () => {
  xit('SQL DB request', async () => {
    cy.sqlServer('select * from Courses').then((result) => {
      console.log('Result-----------', result[1][3]);
    });
  });
  //   it('SQL DB request ORACLE', async () => {
  //     let connection;
  //     connection = await oracledb.getConnection(configOracle);
  //     const result = await connection.execute('select * from countries');
  //     console.log(result.rows);
  //   });
});
