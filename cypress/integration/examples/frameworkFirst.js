/// <reference types='Cypress'/>

import HomePage from '../pageObjects/HomePage';
import ProductPage from '../pageObjects/ProductPage';

describe('Framework with PageObject', () => {
  const homePage = new HomePage();
  const productPage = new ProductPage();
  before(() => {
    cy.visit('https://rahulshettyacademy.com/angularpractice/');
    // Get information from fixtures/example.json file (should use with globalThis!!!)
    cy.fixture('example').then((data) => {
      globalThis.data = data;
    });
  });

  it('Framework with PageObject', () => {
    homePage.editBox().type(globalThis.data.name);
    homePage.getGender().select(globalThis.data.gender);

    // Verify that name is the same
    homePage
      .getTwoWayDataVerifying()
      .should('have.value', globalThis.data.name);

    // Verify that attribute minlength is equal 2
    homePage.editBox().should('have.attr', 'minlength', '2');

    // Verify that radio button is disabled
    homePage.getEnterpreneaur().should('be.disabled');

    homePage.getShopTab().click();
    // Use custom command
    // cy.selectProduct('Blackberry');
    // cy.selectProduct('iphone X');

    // Use data array with forEach
    globalThis.data.productName.forEach((element) => {
      cy.selectProduct(element);
    });

    productPage.checkoutButton().click();
  });
});
