import React, {useState} from "react";
import {InputWrapper} from "../App.styles";

type Props = {
  question: string;
  userAnswer?: string;
  callback: (e: React.FormEvent<HTMLFormElement>, answer: string) => void;
  questionNr: number;
  totalQuestions: number;
};

const InputQuestionCard: React.FC<Props> = ({
  question,
  userAnswer,
  callback,
  questionNr,
  totalQuestions,
}) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim() === "") return;
    callback(e, userInput);
    setUserInput(""); // Clear the input after submission
  };

  return (
    <InputWrapper>
      <p className="question-number">
        Question {questionNr} of {totalQuestions}
      </p>
      <div className="question-text">{question}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.currentTarget.value)}
          placeholder="Type your answer"
        />
        <button type="submit" disabled={!userInput}>
          Submit
        </button>
      </form>
      {userAnswer && <p>Your Answer: {userAnswer}</p>}
    </InputWrapper>
  );
};

export default InputQuestionCard;
