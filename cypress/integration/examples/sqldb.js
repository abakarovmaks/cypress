/// <reference types='Cypress'/>

describe('SQL DB request', () => {
  it('SQL DB request', async () => {
    cy.sqlServer('select * from Persons').then((result) => {
      console.log(result[1][3]);
    });
  });
});
