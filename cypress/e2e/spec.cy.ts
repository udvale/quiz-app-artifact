describe("Quiz App Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Should load the homepage", () => {
    cy.get("h2").contains("Welcome to React Quiz!");
  });

  it("Check if it has 3 difficulty levels", () => {
    // Find the select element that contains difficulty options
    cy.get("select")
      .first()
      .within(() => {
        // Check if it contains 3 options
        cy.get("option").should("have.length", 3);

        // Check for specific difficulty levels
        cy.get("option").eq(0).should("have.text", "Easy");
        cy.get("option").eq(1).should("have.text", "Medium");
        cy.get("option").eq(2).should("have.text", "Hard");
      });
  });
});

describe("Math Trivia Quiz Tests", () => {
  let questions = []; // Declare a global variable for storing questions

  before(() => {
    // Fetch questions before running the tests
    cy.request(
      "GET",
      "https://opentdb.com/api.php?amount=3&difficulty=medium&type=multiple&category=19"
    ).then((response) => {
      questions = response.body.results; // Store the fetched questions in the global variable
    });
  });

  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Should start medium Math Trivia with 3 questions and select correct answers", () => {
    // Set difficulty to Medium
    cy.get("select").eq(0).select("Medium");
    // Set category to Math Trivia
    cy.get("select").eq(1).select("Math Trivia");
    // Set number of questions to 3
    // cy.get('input[type="number"]').clear().type("3");

    //Press Play Quiz Button
    cy.get("button").contains("Play Quiz").click();

    // let score = 0;

    // // Loop through the number of questions (3 in this case)
    // for (let i = 0; i < 3; i++) {
    //   // Wait for the question to be visible
    //   cy.contains(`Question ${i + 1}`).should("be.visible");

    //   // Get all answer buttons and randomly select one
    //   cy.get("button").then((buttons) => {
    //     const randomIndex = Math.floor(Math.random() * buttons.length);
    //     const randomAnswer = buttons[randomIndex];

    //     // Click the randomly selected answer
    //     cy.wrap(randomAnswer).click();

    //     // Check if the clicked answer is correct
    //     const correctAnswer = questions[i].correct_answer;
    //     if (randomAnswer.innerText === correctAnswer) {
    //       score += 1; // Increment the score if correct
    //     }

    //     // Verify if the score is displayed correctly
    //     cy.get(".score").should("have.text", `Score: ${score}`);

    //     // Click the 'Next Question' button if not the last question
    //     if (i < 2) {
    //       cy.get("[data-cy=next-question]").click();
    //     }
    //   });
    // }

    // // Final score verification after the last question
    // cy.get(".score").should("have.text", `Score: ${score}`);
  });
});
