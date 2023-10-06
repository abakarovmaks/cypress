/// <reference types='Cypress'/>
import HomePage from '../../../pageObjects/HomePage';
import ProductPage from '../../../pageObjects/ProductPage';

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const homePage = new HomePage();
const productPage = new ProductPage();
let name;

// First
Given('Open ecommerce page', () => {
  cy.visit(Cypress.env('url') + '/angularpractice/');
});

When('Add items to cart', () => {
  homePage.getShopTab().click();
  globalThis.data.productName.forEach((element) => {
    cy.selectProduct(element);
  });

  productPage.checkoutButton().click();
});

Then('Validate the total prices', () => {
  let sum = 0;

  cy.get('tr td:nth-child(4) strong').each(($el, index, list) => {
    const actualText = $el.text();

    let result = actualText.split(' ');
    result = result[1].trim();
    sum = Number(sum) + Number(result);
    cy.log(result);
    cy.log(sum);
  });

  cy.get('h3 strong').then((elem) => {
    elem.text();
    const actualText = elem.text();
    let result = actualText.split(' ');
    let total = result[1].trim();
    expect(Number(total)).to.equal(sum);
  });
});

Then('Select the country, submit and verify Thankyou message', () => {
  cy.get('.btn.btn-success').click();
  cy.get('#country').type('India');
  cy.get('.suggestions > ul > li', { timeout: 6000 }).click();
  cy.get('.checkbox > label').click({ force: true });
  cy.get('input[type="submit"]').click();
  cy.get('.alert').contains(
    'Success! Thank you! Your order will be delivered in next few weeks :-).'
  );
});

// Second
When('Fell the form details', (dataTable) => {
  name = dataTable.rawTable[1][0];
  homePage.editBox().type(name);
  homePage.getGender().select(dataTable.rawTable[1][1]);
});

Then('Validate the form behaviour', () => {
  homePage.getTwoWayDataVerifying().should('have.value', name);
  homePage.editBox().should('have.attr', 'minlength', '2');
  homePage.getEnterpreneaur().should('be.disabled');
});

Then('Select the shop page', () => {
  homePage.getShopTab().click();
});
