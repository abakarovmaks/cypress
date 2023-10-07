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
  });
});
