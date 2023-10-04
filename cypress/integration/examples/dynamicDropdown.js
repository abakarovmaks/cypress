/// <reference types='Cypress'/>

describe('Dynamic dropdown', () => {
  it('Dynamic dropdown', () => {
    cy.visit(Cypress.env('url') + '/AutomationPractice/');

    // Select and verify one of the dynamic dropdowns select
    cy.get('#autocomplete').type('ind');

    // Create cycle, find text India in dynamic dropdown, verify it and click
    cy.get('.ui-menu-item div').each(($el, index, list) => {
      const textVeg = $el.text();
      if (textVeg === 'India') {
        cy.wrap($el).click();
      }
    });

    // Verify that value is India
    cy.get('#autocomplete').should('have.value', 'India');
  });
});
