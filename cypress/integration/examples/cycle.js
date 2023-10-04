/// <reference types='Cypress'/>

describe('Cycle', () => {
  it('Cycle', () => {
    cy.visit(Cypress.env('url') + '/seleniumPractise/#/');

    cy.get('.search-keyword').type('ca');
    cy.wait(1000);

    // Add specific name for selector
    cy.get('.products').as('productLocator');

    // Add cycle for selector
    cy.get('@productLocator')
      .find('.product')
      .each(($el, index, list) => {
        const textVeg = $el.find('h4.product-name').text();
        if (textVeg.includes('Cashews')) {
          cy.wrap($el).find('button').click();
        }
      });
    cy.get('.cart-icon > img').click();
    cy.contains('PROCEED TO CHECKOUT').click();
    cy.contains('Place Order').click();
  });
});
