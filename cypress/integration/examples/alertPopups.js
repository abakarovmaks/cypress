/// <reference types='Cypress'/>

describe('Alert popups', () => {
  it('Alert popups', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

    cy.get('#alertbtn').click();
    cy.get('#confirmbtn').click();

    // Validation of popup
    cy.on('window.alert', (str) => {
      expect(str).to.equal(
        'Hello , share this practice page and share your knowledge'
      );
    });

    // Validation of confirm popup
    cy.on('window.confirm', (str) => {
      expect(str).to.equal('Hello , Are you sure you want to confirm?');
    });
  });
});
