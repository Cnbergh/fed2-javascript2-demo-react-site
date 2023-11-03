/// <reference types="cypress" />

describe("no.wikipedia.org", () => {
  it("can search for Noroff", () => {
    cy.visit("https://no.wikipedia.org");
    cy.get("input#searchInput").type("Noroff{enter}", { delay: 500 });
    // Click on the button
    cy.get("Button").contains("Søk").click();
    // Troubleshooting - done
    cy.get("h1").contains("Noroff");
  });
});
