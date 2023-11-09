describe("Signing in", () => {
  it("fills in form", () => {
    cy.visit("localhost:5173/login");

    cy.intercept("GET", `https://jsonplaceholder.typicode.com/posts`).as(
      "get-posts",
    );

    cy.intercept("POST", `https://api.noroff.dev/api/v1/social/auth/login`).as(
      "submit-login",
    );

    // Get an input, type into it
    cy.get("#email").type("first.last@stud.noroff.no");

    //  Verify that the value has been updated
    cy.get("#email").should("have.value", "first.last@stud.noroff.no");

    // Get an input, type into it
    cy.get("#password").type("UzI1NiIsInR5cCI");

    //  Verify that the value has been updated
    cy.get("#password").should("have.value", "UzI1NiIsInR5cCI");

    cy.get('[data-cy="submit"]').click();

    cy.get("@submit-login").should(
      "have.nested.property",
      "response.statusCode",
      200,
    );

    cy.url().should("include", "/");
    cy.get("@get-posts").should(
      "have.nested.property",
      "response.statusCode",
      200,
    );
  });
});
