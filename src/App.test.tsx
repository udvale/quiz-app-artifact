// import {describe, expect, test} from "vitest";
// import { render, screen} from '@testing-library/react'
// import App from "./App.tsx";
// import './API';

// describe('<App />', () => {
//   test('App mounts properly', () => {
//     const wrapper = render(<App />)
//     expect(wrapper).toBeTruthy()

//     const h2 = wrapper.container.querySelector('h2')
//     expect(h2?.textContent).toBe('Welcome to React Quiz!')

//     const difficultyLabel = screen.getByLabelText(/Select Difficulty:/i);
//     expect(difficultyLabel).toBeInTheDocument();

//     const categoryLabel = screen.getByLabelText(/Select Category:/i);
//     expect(categoryLabel).toBeInTheDocument();

//     const numberOfQuestionsLabel = screen.getByLabelText(/Number of Questions \(3-10\):/i);
//     expect(numberOfQuestionsLabel).toBeInTheDocument();

//     const startButton = screen.getByRole("button", { name: /Play Quiz/i });
//     expect(startButton).toBeInTheDocument();

//   });

//   test('Dropdowns display correct options', () => {
//     render(<App />);

//     const difficultySelect = screen.getByLabelText(/Select Difficulty:/i);
//     expect(difficultySelect).toBeInTheDocument();
//     expect(difficultySelect).toHaveTextContent('Easy');
//     expect(difficultySelect).toHaveTextContent('Medium');
//     expect(difficultySelect).toHaveTextContent('Hard');

//     const categorySelect = screen.getByLabelText(/Select Category:/i);
//     expect(categorySelect).toBeInTheDocument();
//     expect(categorySelect).toHaveTextContent('Computer Science Trivia');
//     expect(categorySelect).toHaveTextContent('Math Trivia');
//     expect(categorySelect).toHaveTextContent('Math Computational');

//   });
// });
