describe("Post page", () => {
  it("navigates to a single post", () => {
    cy.visit("https://localhost:5173/");

    cy.contains(
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    ).click();

    cy.url().should("include", "/posts/1");
  });

  it("creates a new post", () => {
    cy.visit("https://localhost:5173/");
    console.log(Cypress.env("CYPRESS_API_URL"));
    cy.intercept("POST", `https://jsonplaceholder.typicode.com/posts`).as(
      "new-post",
    );

    cy.get("#title").type("fake title");
    cy.get("[name='userId']").type("123456");
    cy.contains("Create Post").click();

    cy.get("@new-post").should(
      "have.nested.property",
      "response.statusCode",
      201,
    );
  });
});
