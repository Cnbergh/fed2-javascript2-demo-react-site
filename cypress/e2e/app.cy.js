describe("Post page", () => {
  it("navigates to a single post", () => {
    cy.visit("https://localhost:5173/");
    cy.intercept("GET", `https://jsonplaceholder.typicode.com/posts`).as(
      "get-posts",
    );

    cy.debug();

    cy.get("@get-post");
    cy.contains(
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    )
      .click()
      .debug();

    cy.url().should("include", "/posts/1");
  });

  it("creates a new post", () => {
    cy.visit("https://localhost:5173/");
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
    /* ==== Generated with Cypress Studio ==== */
    cy.get(":nth-child(1) > .flex > div > .bg-orange-700").click();
    cy.get("#postEditBody").click();
    cy.get("form > .text-white").click();
    cy.get(":nth-child(2) > .flex > div > .bg-red-700").click();
    /* ==== End Cypress Studio ==== */
  });
});
