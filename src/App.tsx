import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from "./components/QuestionCard";
import {QuestionsState, Difficulty} from "./API";
import {GlobalStyle, Wrapper, SettingsWrapper} from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

let TOTAL_QUESTIONS = 10;
const categories = [
  {value: 18, label: "Computer Science League Quiz"},
  {value: 19, label: "Math League Quiz"},
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    Difficulty.EASY
  );
  const [selectedCategory, setSelectedCategory] = useState<number>(18);
  const [selectedAmount, setSelectedAmount] = useState<number>(3);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    TOTAL_QUESTIONS = selectedAmount;
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      selectedDifficulty,
      selectedCategory
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
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
              ? "Computer Science Knowledge"
              : "Math Knowledge"}
          </h1>
          {!gameOver ? <p className="score">Score: {score}</p> : null}
          {loading ? <p>Loading Questions...</p> : null}
          {!loading && !gameOver && (
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
          {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          ) : null}
        </Wrapper>
      )}
    </>
  );
};

export default App;
