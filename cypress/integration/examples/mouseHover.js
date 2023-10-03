/// <reference types='Cypress'/>

describe('Handling Tab', () => {
  it('Handling Tab', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

    //  Invoke function for showig mouse hover
    cy.get('.mouse-hover-content').invoke('show');
    cy.contains('Top').click();

    // { force: true } click on hidden element
    cy.contains('Top').click({ force: true });
    cy.url().should('include', 'top');
  });
});
