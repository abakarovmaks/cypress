/// <reference types='Cypress'/>

describe('Api test', () => {
  before(() => {
    // cy.visit(Cypress.env('url') + '/angularAppdemo/');
  });

  it('Api test', () => {
    cy.request({
      method: 'POST',
      url: 'http://216.10.245.166/Library/Addbook.php',
      body: {
        name: 'Learn Appium Automation with Java',
        isbn: 'Maks_Abakarov2',
        aisle: '997',
        author: 'Abakarov Maksym2',
      },
    }).then((res) => {
      // expect(res.body).to.have.property('Msg', 'successfully added');
      expect(res.body).to.have.property('Msg', 'Book Already Exists');
      expect(res.status).to.eq(200);
    });
  });
});
