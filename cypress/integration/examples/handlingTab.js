/// <reference types='Cypress'/>

describe('Handling Tab', () => {
  it('Handling Tab', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

    // Remove attribute from selector
    cy.get('#opentab').invoke('removeAttr', 'target').click();

    // Start working with page in new tab
    cy.origin('https://www.qaclickacademy.com', () => {
      cy.get("#navbarSupportedContent a[href*='about']").click();
      cy.get('.mt-50 h2').should('contain', 'QAClick Academy');
    });
  });
});
