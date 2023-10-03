/// <reference types='Cypress'/>

describe('Handling Web Tab', () => {
  it('Handling Web Tab', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

    // Cycle
    cy.get('tr td:nth-child(2)').each(($el, index, list) => {
      const textVeg = $el.text();
      if (textVeg.includes('Python')) {
        cy.get('tr td:nth-child(2)')
          .eq(index)
          .next() // only uses with GET()
          .then((price) => {
            const pricetext = price.text();
            expect(pricetext).to.equal('25');
          });
      }
    });
  });
});
