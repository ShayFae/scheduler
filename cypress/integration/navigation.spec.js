describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  // it("should navigate to Tuesday", () => {
  //   // cy.get("li").contains("Tuesday").click();
  //   cy.visit("/");

  //   cy.contains("[data-testid=day]", "Tuesday")
  //   .click()
  //   .should("have.class", "day-list__item--selected")
  // });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
  
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});