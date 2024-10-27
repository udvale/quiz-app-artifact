// import {shuffleArray} from "./utils";

// export type Question = {
//   category: string;
//   correct_answer: string;
//   difficulty: string;
//   incorrect_answers: string[];
//   question: string;
//   type: string;
// };

// export enum Difficulty {
//   EASY = "easy",
//   MEDIUM = "medium",
//   HARD = "hard",
// }

// export type QuestionsState = Question & {answers: string[]};

// export const fetchQuizQuestions = async (
//   amount: number,
//   difficulty: Difficulty,
//   category: number
// ): Promise<QuestionsState[]> => {
//   const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=${category}`;
//   const data = await (await fetch(endpoint)).json();
//   return data.results.map((question: Question) => ({
//     ...question,
//     answers: shuffleArray([
//       ...question.incorrect_answers,
//       question.correct_answer,
//     ]),
//   }));
// };

// Rapid API integration
// import axios from "axios";
// import {shuffleArray} from "./utils";

// export type Question = {
//   category: string;
//   correct_answer: string;
//   difficulty: string;
//   incorrect_answers: string[];
//   question: string;
//   type: string;
// };

// export enum Difficulty {
//   EASY = "easy",
//   MEDIUM = "medium",
//   HARD = "hard",
// }

// export type QuestionsState = Question & {answers: string[]};

// const RAPIDAPI_HOST = "math-equations-api.p.rapidapi.com";
// const RAPIDAPI_KEY = "0f756172a4msh69fda9b356d2ed7p123866jsne51a63bbf498";

// export const fetchQuizQuestions = async (
//   amount: number,
//   difficulty: Difficulty,
//   category: number
// ): Promise<QuestionsState[]> => {
//   try {
//     if (category === 20) {
//       // Math Computational
//       const response = await axios.get(
//         `https://${RAPIDAPI_HOST}/${difficulty}`,
//         {
//           headers: {
//             "X-RapidAPI-Key": RAPIDAPI_KEY,
//             "X-RapidAPI-Host": RAPIDAPI_HOST,
//           },
//         }
//       );

//       const data = response.data;

//       // Handle single-object response by replicating it up to the amount
//       const mathQuestions = Array(amount).fill({
//         category: "Math Computational",
//         correct_answer: data.solution.toString(),
//         difficulty: difficulty,
//         incorrect_answers: [],
//         question: data.equation,
//         type: "input",
//         answers: [data.solution.toString()],
//       });

//       return mathQuestions;
//     } else {
//       // OpenTDB API for other categories
//       const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=${category}`;
//       const data = await (await fetch(endpoint)).json();

//       return data.results.map((question: Question) => ({
//         ...question,
//         answers: shuffleArray([
//           ...question.incorrect_answers,
//           question.correct_answer,
//         ]),
//       }));
//     }
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     return [];
//   }
// };

import axios from "axios";
import {shuffleArray} from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type QuestionsState = Question & {answers: string[]};
const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty,
  category: number
): Promise<QuestionsState[]> => {
  try {
    if (category === 20) {
      // Fetch from local Flask API for Math Computational
      const mathQuestions: QuestionsState[] = [];

      for (let i = 0; i < amount; i++) {
        const response = await axios.get(`${BASE_URL}/generate`);
        const data = response.data;

        mathQuestions.push({
          category: "Math Computational",
          correct_answer: data.correct_answer,
          difficulty: "easy",
          incorrect_answers: [],
          question: data.problem,
          type: "input",
          answers: [data.correct_answer],
        });
      }

      return mathQuestions;
    } else {
      // OpenTDB API for other categories
      const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=${category}`;
      const data = await (await fetch(endpoint)).json();

      return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }));
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
