/// <reference types='Cypress'/>

let productName;

describe('JWT Session', () => {
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
    cy.contains('Excel').click();

    // Variable for Excel file path
    const filePath =
      Cypress.config('fileServerFolder') +
      '/cypress/downloads/order-invoice_abakarovmaks.xlsx';

    // Transform Excel to JSON
    cy.task('excelToJsonConverter', filePath).then((result) => {
      cy.log('RESULT--------', result.data[1].A);
      expect(productName).to.equal(result.data[1].B);
    });

    // Native cypress method that verifying in whole file text, that text of the product is in
    cy.readFile(filePath).then((text) => {
      expect(text).to.include(productName);
    });
  });
});
