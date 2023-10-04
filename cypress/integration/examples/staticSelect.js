/// <reference types='Cypress'/>

describe('Static select dropdown', () => {
  it('Static select dropdown', () => {
    cy.visit(Cypress.env('url') + '/AutomationPractice/');

    // Select one option from sattic select dropdown
    cy.get('select').select('option2').should('have.value', 'option2');
  });
});
