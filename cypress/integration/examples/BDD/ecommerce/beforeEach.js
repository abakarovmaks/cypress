beforeEach(() => {
  cy.fixture('example').then((data) => {
    globalThis.data = data;
  });
});
