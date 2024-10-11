import styled, {createGlobalStyle} from "styled-components";
import BGImage from "./images/bg2.jpg";

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    background-image: url(${BGImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh; 

  > p {
    color: #f8f9fa;
  }

  .score {
    color: #f8f9fa;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: 'Comfortaa', cursive; 
    background-image: linear-gradient(180deg, #f8f9fa, #f8f9fa);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #000);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  .start, .next {
    cursor: pointer;
    background: linear-gradient(180deg, #f8f9fa, #d4d4d4); /* Softer colors to match the white Miffy background */
    border: 2px solid #000;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 50px;
    margin: 20px 0;
    padding: 0 40px;
    font-size: 1.2rem; /* Make text inside buttons larger */
    font-family: 'Comfortaa', cursive; /* Aesthetic font for buttons */
  }
    

  .start {
    max-width: 200px;
  }
`;

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;  /* Adjusted container width */
  background: #222831;
  border-radius: 10px;
  border: 2px solid #393e46;
  padding: 20px;
  margin: 15vh auto;  /* Vertically center the box */
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  color: #f8f9fa;

  h2 {
    margin-bottom: 20px;
    font-family: 'Comfortaa', cursive;
  }

  label {
    display: inline-flex;
    align-items: center;
    margin: 10px 0;
    font-size: 1.1rem;
    color: #f8f9fa;
  }

  select,
  input {
    margin-left: 10px;  /* Small space between label and dropdown/input */
    padding: 8px;  /* Slightly smaller padding for better alignment */
    border-radius: 5px;
    border: 1px solid #393e46;
    background: #eeeeee;
    font-size: 1rem;
  }

  button {
    cursor: pointer;
    background: linear-gradient(180deg, #f8f9fa, #d4d4d4);  /* Match the existing button color scheme */
    border: 2px solid #000;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    color: #000;
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 1.2rem;
    font-family: 'Comfortaa', cursive;  /* Match the existing font for consistency */
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.9;
    }
  }
`;
