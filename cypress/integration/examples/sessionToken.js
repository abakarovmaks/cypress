/// <reference types='Cypress'/>

describe('JWT Session', () => {
  before(() => {
    // cy.visit(Cypress.env('url') + '/client/auth/login');
  });

  it('Session token test', () => {
    cy.LoginAPI().then(() => {
      cy.visit(Cypress.env('url') + '/client', {
        onBeforeLoad: (window) => {
          window.localStorage.setItem('token', Cypress.env('token'));
        },
      });
    });

    // Add items to cart
    cy.get('.card-body button:last-of-type').eq(1).click();
    cy.get("[routerlink*='cart']").click();
    cy.contains('Checkout').click();
    cy.get("[placeholder*='Country']").type('Ind');
    cy.get('.ta-results button').each((el) => {
      if (el.text() === ' India') {
        cy.wrap(el).click();
      }
    });
    cy.get('.action__submit').click({ force: true });
    cy.wait(2000);

    cy.contains('CSV').click();
  });
});
