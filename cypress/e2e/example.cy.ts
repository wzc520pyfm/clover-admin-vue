// https://docs.cypress.io/api/introduction/api.html

describe("My Home Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h2", "Clover管理系统");
  });
});
