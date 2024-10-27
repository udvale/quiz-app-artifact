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
  let score = 0;
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Should start medium Math Trivia with 3 questions and select correct answers", () => {
    cy.log("Setting difficulty to Medium and category to Math Trivia");
    cy.get("select").eq(0).select("Medium");
    cy.wait(1000);
    cy.get("select").eq(1).select("Math Trivia");
    cy.wait(1000);
    // cy.get('input[type="number"]').clear().type("3");

    cy.log("Starting the quiz by clicking the Play Quiz button");
    cy.get("button").contains("Play Quiz").click();
    cy.wait(1000);

    for (let i = 0; i < 3; i++) {
      cy.log(`Answering Question ${i + 1} of 3`);
      cy.get("p")
        .contains(`Question: ${i + 1} / 3`)
        .should("be.visible");

      cy.get("button[value]").then(($buttons) => {
        // Simulate selecting a random answer
        const randomIndex = Math.floor(Math.random() * $buttons.length);
        const randomButton = $buttons.eq(randomIndex);

        cy.wrap(randomButton).click();

        /**
         * default not selected - "sc-gtLWhw ctjdma"  ===> nothing is selected
         * wrong answer selected - "sc-gtLWhw klHjot" ===> wrong answer
         * right answer selected or not selected- "sc-gtLWhw gMneIB"   ===> right answer is displayed
         */
        cy.wrap(randomButton)
          .parent()
          .invoke("attr", "class")
          .then((className) => {
            if (className) {
              if (className.includes("gMneIB")) {
                // Correct answer: increment score
                score++;
                cy.log("✅ Correct answer selected! Incrementing the score.");
              } else if (className.includes("klHjot")) {
                cy.log("❌ Wrong answer selected! Score remains the same.");
              }
            } else {
              cy.log(
                "⚠️ Unable to determine the answer status (undefined class)."
              );
            }
          });
        cy.wait(2000);
      });
      cy.log("Clicking Next Question to move to the next question");
      if (i < 2) {
        cy.get("button").contains("Next Question").click();
      }
    }
    cy.log("Verifying the final score displayed on the webpage");
    cy.get(".score").then(($score) => {
      const displayedScore = parseInt($score.text().replace("Score: ", ""), 10);
      cy.log(`Displayed score on the webpage: ${displayedScore}`);
      expect(displayedScore).to.equal(score);
    });

    cy.wait(2000); // Add delay to observe the final score
  });
});

describe("Computer Science Trivia Quiz Tests", () => {
  let score = 0;
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Should start hard Computer Science Trivia with 3 questions and select correct answers", () => {
    cy.log("Setting difficulty to Hrd and category to Computer Science Trivia");
    cy.get("select").eq(0).select("Hard");
    cy.wait(1000);
    cy.get("select").eq(1).select("Computer Science Trivia");
    cy.wait(1000);
    // cy.get('input[type="number"]').clear().type("3");

    cy.log("Starting the quiz by clicking the Play Quiz button");
    cy.get("button").contains("Play Quiz").click();
    cy.wait(1000);

    for (let i = 0; i < 3; i++) {
      cy.log(`Answering Question ${i + 1} of 3`);
      cy.get("p")
        .contains(`Question: ${i + 1} / 3`)
        .should("be.visible");

      cy.get("button[value]").then(($buttons) => {
        // Simulate selecting a random answer
        const randomIndex = Math.floor(Math.random() * $buttons.length);
        const randomButton = $buttons.eq(randomIndex);

        cy.wrap(randomButton).click();

        cy.wrap(randomButton)
          .parent()
          .invoke("attr", "class")
          .then((className) => {
            if (className) {
              if (className.includes("gMneIB")) {
                // Correct answer: increment score
                score++;
                cy.log("✅ Correct answer selected! Incrementing the score.");
              } else if (className.includes("klHjot")) {
                cy.log("❌ Wrong answer selected! Score remains the same.");
              }
            } else {
              cy.log(
                "⚠️ Unable to determine the answer status (undefined class)."
              );
            }
          });
        cy.wait(2000);
      });
      cy.log("Clicking Next Question to move to the next question");
      if (i < 2) {
        cy.get("button").contains("Next Question").click();
      }
    }
    cy.log("Verifying the final score displayed on the webpage");
    cy.get(".score") // Replace with actual score element selector
      .then(($score) => {
        const displayedScore = parseInt(
          $score.text().replace("Score: ", ""),
          10
        );
        cy.log(`Displayed score on the webpage: ${displayedScore}`);
        expect(displayedScore).to.equal(score);
      });

    cy.wait(2000); // Add delay to observe the final score
  });
});

