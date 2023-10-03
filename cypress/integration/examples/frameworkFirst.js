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

    // Verify that name is the same
    cy.get(':nth-child(4) > .ng-untouched').should(
      'have.value',
      globalThis.data.name
    );

    // Verify that attribute minlength is equal 2
    cy.get(':nth-child(1) > .form-control').should(
      'have.attr',
      'minlength',
      '2'
    );

    // Verify that radio button is disabled
    cy.get('#inlineRadio3').should('be.disabled');

    cy.get(':nth-child(2) > .nav-link').click();
    // Use custom command
    cy.selectProduct('Blackberry');
    cy.selectProduct('iphone X');

    // Use data array with forEach
    globalThis.data.productName.forEach((element) => {
      cy.selectProduct(element);
    });
  });
});
