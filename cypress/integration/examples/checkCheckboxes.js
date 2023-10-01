/// <reference types='Cypress'/>

describe('Check checkboxes', () => {
  it('Check checkboxes', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

    // Add check and verify checkbox
    cy.get('#checkBoxOption1')
      .check()
      .should('be.checked')
      .and('have.value', 'option1');

    // Uncheck and verify checkbox
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked');

    // Add check to second and third checkboxes
    cy.get('input[type="checkbox"]').check(['option2', 'option3']);
  });
});
