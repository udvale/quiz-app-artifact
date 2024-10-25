import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from "./components/QuestionCard";
import InputQuestionCard from "./components/InputQuestionCard";
import {QuestionsState, Difficulty} from "./API";
import {GlobalStyle, Wrapper, SettingsWrapper} from "./App.styles";
// import Calculator from "./components/Calculator";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const categories = [
  {value: 18, label: "Computer Science Trivia"},
  {value: 19, label: "Math Trivia"},
  {value: 20, label: "Math Computational"}, // New category for local API
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState<number>(10); // New state for total questions

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    Difficulty.EASY
  );
  const [selectedCategory, setSelectedCategory] = useState<number>(18);
  const [selectedAmount, setSelectedAmount] = useState<number>(3);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    setTotalQuestions(selectedAmount);

    const newQuestions = await fetchQuizQuestions(
      selectedAmount,
      selectedDifficulty,
      selectedCategory
    );

    if (newQuestions.length === 0) {
      alert("No questions found. Please try a different category.");
      setGameOver(true);
      setLoading(false);
      return;
    }

    // Adjust total questions based on available questions
    setTotalQuestions(Math.min(newQuestions.length, selectedAmount));
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const checkInputAnswer = (
    e: React.FormEvent<HTMLFormElement>,
    answer: string
  ) => {
    e.preventDefault();

    if (!gameOver) {
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
      nextQuestion(); // Move to the next question automatically
    }
  };

  const resetQuiz = () => {
    setGameOver(true);
    setScore(0);
    setQuestions([]);
    setUserAnswers([]);
    setNumber(0);
  };

  const nextQuestion = () => {
    const nextQ = number + 1;

    if (nextQ === totalQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <GlobalStyle />
      {gameOver && (
        <SettingsWrapper>
          <h2>Welcome to React Quiz!</h2>
          {selectedCategory !== 20 && (
            <label>
              Select Difficulty:
              <select
                value={selectedDifficulty}
                onChange={(e) =>
                  setSelectedDifficulty(e.target.value as Difficulty)
                }
              >
                <option value={Difficulty.EASY}>Easy</option>
                <option value={Difficulty.MEDIUM}>Medium</option>
                <option value={Difficulty.HARD}>Hard</option>
              </select>
            </label>
          )}
          <label>
            Select Category:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Number of Questions (3-10):
            <input
              type="number"
              value={selectedAmount}
              min={3}
              max={10}
              onChange={(e) => setSelectedAmount(Number(e.target.value))}
            />
          </label>
          <button className="start" onClick={startTrivia}>
            Play Quiz
          </button>
        </SettingsWrapper>
      )}
      {!gameOver && (
        <Wrapper>
          <h1>
            {selectedCategory === 18
              ? "Computer Science Trivia"
              : selectedCategory === 19
              ? "Math Trivia"
              : "Math Computational"}
          </h1>
          {!gameOver ? <p className="score">Score: {score}</p> : null}
          {loading ? <p>Loading Questions...</p> : null}
          {/* {!loading && selectedCategory === 20 && <Calculator />} */}
          {!loading && !gameOver && questions[number].type === "multiple" && (
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={totalQuestions}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
          {!loading &&
            !gameOver &&
            questions.length > 0 &&
            questions[number] &&
            questions[number].type === "input" && (
              <InputQuestionCard
                questionNr={number + 1}
                totalQuestions={totalQuestions}
                question={questions[number].question}
                userAnswer={
                  userAnswers ? userAnswers[number]?.answer : undefined
                }
                callback={checkInputAnswer}
              />
            )}
          {!gameOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            number !== totalQuestions - 1 && (
              <button className="next" onClick={nextQuestion}>
                Next Question
              </button>
            )}
          {!loading && gameOver && number === totalQuestions - 1 && (
            <button className="start" onClick={resetQuiz}>
              Go Back to Home
            </button>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default App;



// import React, { useState } from 'react';
// import { fetchQuizQuestions } from './API';
// // Components
// import QuestionCard from "./components/QuestionCard";
// import {QuestionsState, Difficulty} from "./API";
// import {GlobalStyle, Wrapper, SettingsWrapper} from "./App.styles";

// export type AnswerObject = {
//   question: string;
//   answer: string;
//   correct: boolean;
//   correctAnswer: string;
// };

// let TOTAL_QUESTIONS = 10;
// const categories = [
//   {value: 18, label: "Computer Science League Quiz"},
//   {value: 19, label: "Math League Quiz"},
// ];

// const App: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [questions, setQuestions] = useState<QuestionsState[]>([]);
//   const [number, setNumber] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(true);

//   const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
//     Difficulty.EASY
//   );
//   const [selectedCategory, setSelectedCategory] = useState<number>(18);
//   const [selectedAmount, setSelectedAmount] = useState<number>(3);

//   const startTrivia = async () => {
//     setLoading(true);
//     setGameOver(false);
//     TOTAL_QUESTIONS = selectedAmount;
//     const newQuestions = await fetchQuizQuestions(
//       TOTAL_QUESTIONS,
//       selectedDifficulty,
//       selectedCategory
//     );
//     setQuestions(newQuestions);
//     setScore(0);
//     setUserAnswers([]);
//     setNumber(0);
//     setLoading(false);
//   };

//   const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (!gameOver) {
//       const answer = e.currentTarget.value;
//       const correct = questions[number].correct_answer === answer; //check answer
//       if (correct) setScore((prev) => prev + 1); //increment score if correct
//       const answerObject = {
//         question: questions[number].question,
//         answer,
//         correct,
//         correctAnswer: questions[number].correct_answer,
//       };
//       setUserAnswers((prev) => [...prev, answerObject]);
//     }
//   };

//   const nextQuestion = () => {
//     const nextQ = number + 1;

//     if (nextQ === TOTAL_QUESTIONS) {
//       setGameOver(true);
//     } else {
//       setNumber(nextQ);
//     }
//   };

//   return (
//     <>
//       <GlobalStyle />
//       {gameOver && (
//         <SettingsWrapper>
//           <h2>Welcome to React Quiz!</h2>
//           <label>
//             Select Difficulty:
//             <select
//               value={selectedDifficulty}
//               onChange={(e) =>
//                 setSelectedDifficulty(e.target.value as Difficulty)
//               }
//             >
//               <option value={Difficulty.EASY}>Easy</option>
//               <option value={Difficulty.MEDIUM}>Medium</option>
//               <option value={Difficulty.HARD}>Hard</option>
//             </select>
//           </label>
//           <label>
//             Select Category:
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(Number(e.target.value))}
//             >
//               {categories.map((category) => (
//                 <option key={category.value} value={category.value}>
//                   {category.label}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label>
//             Number of Questions (3-10):
//             <input
//               type="number"
//               value={selectedAmount}
//               min={3}
//               max={10}
//               onChange={(e) => setSelectedAmount(Number(e.target.value))}
//             />
//           </label>
//           <button className="start" onClick={startTrivia}>
//             Play Quiz
//           </button>
//         </SettingsWrapper>
//       )}
//       {!gameOver && (
//         <Wrapper>
//           <h1>
//             {selectedCategory === 18
//               ? "Computer Science Knowledge"
//               : "Math Knowledge"}
//           </h1>
//           {!gameOver ? <p className="score">Score: {score}</p> : null}
//           {loading ? <p>Loading Questions...</p> : null}
//           {!loading && !gameOver && (
//             <QuestionCard
//               questionNr={number + 1}
//               totalQuestions={TOTAL_QUESTIONS}
//               question={questions[number].question}
//               answers={questions[number].answers}
//               userAnswer={userAnswers ? userAnswers[number] : undefined}
//               callback={checkAnswer}
//             />
//           )}
//           {!gameOver &&
//           !loading &&
//           userAnswers.length === number + 1 &&
//           number !== TOTAL_QUESTIONS - 1 ? (
//             <button className="next" onClick={nextQuestion}>
//               Next Question
//             </button>
//           ) : null}
//         </Wrapper>
//       )}
//     </>
//   );
// };

// export default App;

// import React, {useState, useEffect} from "react";
// import {
//   fetchOpenTDBQuestions,
//   fetchMathEquations,
//   QuestionsState,
//   MathQuestion,
//   Difficulty,
// } from "./API";
// import {GlobalStyle, Wrapper, SettingsWrapper} from "./App.styles";

// export type AnswerObject = {
//   question: string;
//   answer: string;
//   correct: boolean;
//   correctAnswer: string;
// };

// const TOTAL_QUESTIONS = 10;
// const categories = [
//   {value: 18, label: "Computer Science Quiz"},
//   {value: 19, label: "Math Quiz"},
//   {value: 20, label: "Math Equations"}, // Custom API
// ];

// const App: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [questions, setQuestions] = useState<(QuestionsState | MathQuestion)[]>(
//     []
//   );
//   const [number, setNumber] = useState(0);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(true);
//   const [timeLeft, setTimeLeft] = useState(60);

//   const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
//     Difficulty.EASY
//   );
//   const [selectedCategory, setSelectedCategory] = useState<number>(18);
//   const [selectedAmount, setSelectedAmount] = useState<number>(3);

//   useEffect(() => {
//     if (!gameOver && timeLeft > 0) {
//       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//       return () => clearInterval(timer);
//     } else if (timeLeft === 0) {
//       setGameOver(true);
//     }
//   }, [gameOver, timeLeft]);

//   const startTrivia = async () => {
//     setLoading(true);
//     setGameOver(false);
//     setTimeLeft(60);

//     try {
//       let newQuestions: (QuestionsState | MathQuestion)[] = [];

//       if (selectedCategory === 20) {
//         newQuestions = await fetchMathEquations();
//       } else {
//         newQuestions = await fetchOpenTDBQuestions(
//           selectedAmount,
//           selectedDifficulty,
//           selectedCategory
//         );
//       }

//       if (newQuestions.length === 0) {
//         alert("No questions available. Please try again.");
//         setGameOver(true);
//       } else {
//         setQuestions(newQuestions);
//         setScore(0);
//         setNumber(0);
//         setUserAnswer("");
//       }
//     } catch (error) {
//       console.error("Error starting trivia:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkAnswer = () => {
//     if (!gameOver && questions[number]) {
//       const currentQuestion = questions[number];

//       // Check the answer based on the type of question
//       const correct =
//         "question" in currentQuestion
//           ? currentQuestion.correct_answer === userAnswer.trim()
//           : currentQuestion.correct_answer === userAnswer.trim();

//       if (correct) {
//         setScore((prev) => prev + 1);
//       }

//       setUserAnswer("");
//       if (number + 1 === TOTAL_QUESTIONS) {
//         setGameOver(true);
//       } else {
//         setNumber((prev) => prev + 1);
//       }
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserAnswer(e.currentTarget.value);
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const category = Number(e.currentTarget.value);
//     setSelectedCategory(category);
//     // Disable difficulty and amount if Math Equations is selected
//     if (category === 20) {
//       setSelectedDifficulty(Difficulty.EASY);
//       setSelectedAmount(1);
//     }
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <Wrapper>
//         <h1>Quiz App</h1>
//         {gameOver ? (
//           <SettingsWrapper>
//             <h2>Welcome to the Quiz App!</h2>
//             <label>
//               Select Category:
//               <select value={selectedCategory} onChange={handleCategoryChange}>
//                 {categories.map((category) => (
//                   <option key={category.value} value={category.value}>
//                     {category.label}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             {selectedCategory !== 20 && (
//               <>
//                 <label>
//                   Select Difficulty:
//                   <select
//                     value={selectedDifficulty}
//                     onChange={(e) =>
//                       setSelectedDifficulty(e.target.value as Difficulty)
//                     }
//                   >
//                     <option value={Difficulty.EASY}>Easy</option>
//                     <option value={Difficulty.MEDIUM}>Medium</option>
//                     <option value={Difficulty.HARD}>Hard</option>
//                   </select>
//                 </label>
//                 <label>
//                   Number of Questions (3-10):
//                   <input
//                     type="number"
//                     value={selectedAmount}
//                     min={3}
//                     max={10}
//                     onChange={(e) => setSelectedAmount(Number(e.target.value))}
//                   />
//                 </label>
//               </>
//             )}
//             <button className="start" onClick={startTrivia}>
//               Start Quiz
//             </button>
//           </SettingsWrapper>
//         ) : (
//           <>
//             <p className="score">Score: {score}</p>
//             <p className="timer">Time Left: {timeLeft} seconds</p>
//             {/* Check if questions[number] is defined */}
//             {questions[number] ? (
//               "question" in questions[number] ? (
//                 <p
//                   dangerouslySetInnerHTML={{__html: questions[number].question}}
//                 />
//               ) : (
//                 <p>{questions[number].problem}</p>
//               )
//             ) : (
//               <p>Loading question...</p>
//             )}
//             <input
//               type="text"
//               value={userAnswer}
//               onChange={handleInputChange}
//               placeholder="Type your answer here"
//             />
//             <button onClick={checkAnswer}>Submit Answer</button>
//           </>
//         )}
//       </Wrapper>
//     </>
//   );
// };

// export default App;
