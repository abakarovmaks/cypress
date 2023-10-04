/// <reference types='Cypress'/>

describe('Hidden elemenets', () => {
  it('Hidden elements', () => {
    cy.visit(Cypress.env('url') + '/AutomationPractice/');

    cy.get('#hide-textbox').click();
    cy.get('#displayed-text').should('not.be.visible');
    cy.get('#show-textbox').click();
    cy.get('#displayed-text').should('be.visible');

    // Radio buttons
    cy.get("[value='radio2']").check().should('be.checked');
  });
});
