Cypress.Commands.add("login", (email, password) => {
  cy.visit("/booksNode");
  cy.contains("Log in").click();
  if (email) {
    cy.get("#mail").type(email);
  }
  if (password) {
    cy.get("#pass").type(password);
  }
  cy.contains("Submit").click();
});

Cypress.Commands.add(
  "addNewBook",
  (title, description, fileCover, fileBook, authors) => {
    cy.contains("Add new").click();
    cy.contains("Book description").should("be.visible");
    cy.get("#title").type(title);
    cy.get("#description").type(description);
    cy.get("#fileCover").selectFile(fileCover);
    cy.get("#fileBook").selectFile(fileBook);
    cy.get("#authors").type(authors);
    cy.get("#favorite").click();
    cy.contains("Submit").click();
  }
);
