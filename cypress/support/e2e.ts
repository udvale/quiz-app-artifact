// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

describe("Quiz App Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Should load the homepage", () => {
    cy.get("h2");
    cy.contains("Welcome to React Quiz!");
  });

  //   it("Should start a Computer Science quiz", () => {
  //     cy.get("[data-cy=start-cs-quiz]").click();

  //     cy.contains("Question 1");
  //   });

  //   it("Should answer a question correctly", () => {
  //     cy.get("[data-cy=start-cs-quiz]").click();

  //     cy.get("[data-cy=answer-option-1]").click();

  //     cy.get("[data-cy=next-question]").click();

  //     cy.contains("Score: 1");
  //   });

  //   it("Should finish the quiz", () => {
  //     cy.get("[data-cy=start-cs-quiz]").click();

  //     for (let i = 1; i <= 5; i++) {
  //       cy.get("[data-cy=answer-option-1]").click();
  //       cy.get("[data-cy=next-question]").click();
  //     }

  //     cy.contains("Quiz Completed!");
  //   });

  //   it("Should navigate to the Math Equations page", () => {
  //     cy.get("[data-cy=navigate-math-equations]").click();

  //     cy.contains("Math Equations");
  //   });
});
