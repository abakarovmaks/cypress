/// <reference types='Cypress'/>

describe('Intercept test', () => {
  before(() => {
    cy.visit(Cypress.env('url') + '/angularAppdemo/');
  });

  it('Intercept test', () => {
    cy.intercept(
      // Request
      {
        method: 'GET',
        url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
      },
      // Responce
      {
        statusCode: 200,
        body: [
          {
            book_name: 'RestAssured with Java',
            isbn: 'BSG',
            aisle: '2302',
          },
        ],
      }
    ).as('bookResult');
    cy.get('.btn.btn-primary').click();
    cy.wait('@bookResult');
    cy.get('p').should('have.text', 'Oops only 1 Book available');
  });
});
