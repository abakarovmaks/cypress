/// <reference types='Cypress'/>

describe('Framework 1st', () => {
  before(() => {
    cy.visit('https://rahulshettyacademy.com/angularpractice/');
    // Get information from fixtures/example.json file (should use with globalThis!!!)
    cy.fixture('example').then((data) => {
      globalThis.data = data;
    });
  });

  it('Framework 1st', () => {
    cy.get(':nth-child(1) > .form-control').type(globalThis.data.name);
    cy.get('select').select(globalThis.data.gender);
  });
});
