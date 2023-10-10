/// <reference types='Cypress'/>
require('@babel/register');
const neatCSV = require('neat-csv');

let productName;

describe('JWT Session', () => {
  before(() => {
    // cy.visit(Cypress.env('url') + '/client/auth/login');
  });

  it('Session token test', async () => {
    cy.LoginAPI().then(() => {
      cy.visit(Cypress.env('url') + '/client', {
        onBeforeLoad: (window) => {
          window.localStorage.setItem('token', Cypress.env('token'));
        },
      });
    });

    cy.get('.card-body b')
      .eq(1)
      .then((elem) => {
        productName = elem.text();
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

    // Read JSON file from CSV
    cy.readFile(
      // Dynamically generated path to JSON file
      Cypress.config('fileServerFolder') +
        '/cypress/downloads/order-invoice_abakarovmaks.csv'
    ).then(async (text) => {
      const csv = await neatCSV(text);
      console.log('Test object', csv);
      const actualProductCSV = csv[0]['Product Name']; // Using following brackets because the space in the middle of the key name
      expect(productName).to.equal(actualProductCSV);
    });
  });
});
