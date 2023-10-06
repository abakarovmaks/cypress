/// <reference types='Cypress'/>

describe('Security test', () => {
  before(() => {
    cy.visit(Cypress.env('url') + '/angularAppdemo/');
  });

  it('Security test', () => {
    cy.intercept(
      'GET',
      'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
      (req) => {
        req.url =
          'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=maksym';

        req.continue((res) => {
          expect(res.statusCode).to.equal(404);
        });
      }
    ).as('dummyUrl');

    cy.get('.btn.btn-primary').click();

    cy.wait('@dummyUrl');
  });
});
