/// <reference types='Cypress'/>
/// <reference types='cypress-iframe'/>
import 'cypress-iframe';

describe('iframe', () => {
  it('iframe', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

    // Open the iframe
    cy.frameLoaded('#courses-iframe');

    // Switch to iframe mode
    cy.iframe().find('a[href*="mentorship"]').eq(0).click();

    // Assert the length of the h1 on iframe page
    cy.wait(1000);
    cy.iframe().find('h1[class*="pricing-title"]').should('have.length', 2);
  });
});
