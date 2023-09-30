/// <reference types='Cypress'/>

describe('First Test', () => {
  it('First test case', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(1000);
    cy.get('.product').should('have.length', 5);
    cy.get('.product:visible').should('have.length', 4);
    cy.get('.products').as('productLocator');
    cy.get('@productLocator').find('.product').should('have.length', 4);
    cy.get(':nth-child(2) > .product-action > button').click();
    cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click();
    cy.get('.products')
      .find('.product')
      .each(($el, index, list) => {
        const textVeg = $el.find('h4.product-name').text();
        if (textVeg.includes('Cashews')) {
          cy.wrap($el).find('button').click();
        }
      });
    cy.get('.brand').then(function (logtext) {
      cy.log(logtext.text());
    });
    cy.get('.brand').should('have.text', 'GREENKART');
  });
});
