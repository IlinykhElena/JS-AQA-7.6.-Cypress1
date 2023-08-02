import data from "../fixtures/data.json";

describe("lig in", () => {
  it("Should successfully login", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Should not login with empty login", () => {
    cy.login(null, "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("Should not login with empty password", () => {
    cy.login("test@test.com", null);

    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#pass")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  //один из примеров, все варианты не расписываю
  it("Should not login with wrong login", () => {
    cy.login("test", "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Адрес электронной почты должен содержать символ");
  });

  //один из вариантов закрытия формы регистрации
  it("should close log in form", () => {
    cy.visit("/booksNode");
    cy.contains("Log in").click();
    cy.contains("Cancel").click();
    cy.contains("Your Email").should("not.exist");
  });
});

describe.only("books in favorites", () => {
  beforeEach(() => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Favorites").click();
  });

  it("favorites list is empty", () => {
    //cy.contains("Favorites").click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible"
    );
  });

  it("add a book to favorites list", () => {
    cy.contains("Please add some book to favorit on home page!").click();
    cy.addNewBook(
      data.title,
      data.description,
      data.fileCover,
      data.fileBook,
      data.authors
    );
    cy.contains("Favorites").click();
    cy.contains(data.title).should("be.visible");
    cy.contains(data.authors).should("be.visible");
  });

  it("delete from favorite", () => {
    cy.visit("/favorites");
    cy.contains("Please add some book to favorit on home page!").click();
    cy.addNewBook(
      data.title,
      data.description,
      data.fileCover,
      data.fileBook,
      data.authors
    );
    cy.contains("Delete from favorite").click();
    cy.contains("title").should("not.exist");
  });

  it("log out from favorites", () => {
    cy.contains("Log out").click();
    cy.contains("Log in").should("be.visible");
  });
});
