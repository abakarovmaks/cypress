// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

// Array cycle
Cypress.Commands.add('selectProduct', (productName) => {
  cy.get('h4.card-title').each(($el, index, list) => {
    if ($el.text().includes(productName)) {
      cy.get('button.btn.btn-info').eq(index).click();
    }
  });
});

// Token
Cypress.Commands.add('LoginAPI', () => {
  cy.request('POST', 'https://rahulshettyacademy.com/api/ecom/auth/login', {
    userEmail: 'abakarovmakscypress@gmail.com',
    userPassword: 'cypressTest1',
  }).then((res) => {
    expect(res.status).to.eq(200);
    Cypress.env('token', res.body.token);
  });
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
