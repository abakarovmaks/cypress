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
    Cypress.config('defaultCommandTimeout', 8000);
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

    // Variable for sum
    let sum = 0;
    productPage.checkoutButton().click();

    // Cycle for getting sum of goods
    cy.get('tr td:nth-child(4) strong').each(($el, index, list) => {
      const actualText = $el.text();
      // Using of JavaScript
      let result = actualText.split(' ');
      result = result[1].trim();
      sum = Number(sum) + Number(result);
      cy.log(result);
      cy.log(sum);
    });

    // Comparing results of sum
    cy.get('h3 strong').then((elem) => {
      elem.text();
      const actualText = elem.text();
      let result = actualText.split(' ');
      let total = result[1].trim();
      expect(Number(total)).to.equal(sum);
    });

    cy.get('.btn.btn-success').click();
    cy.get('#country').type('India');
    cy.get('.suggestions > ul > li > a').click();
    cy.get('.checkbox > label').click();
    cy.get('input[type="submit"]').click();
    cy.get('.alert').contains(
      'Success! Thank you! Your order will be delivered in next few weeks :-).'
    );
  });
});
