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
    font-size: 60px;
    text-align: center;
    margin: 20px;
  }

  .start, .next {
    cursor: pointer;
    background: linear-gradient(180deg, #f8f9fa, #d4d4d4); 
    border: 2px solid #000;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 50px;
    margin: 20px 0;
    padding: 0 40px;
    font-size: 1.2rem; 
    font-family: 'Comfortaa', cursive;
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
  width: 600px; 
  background: #222831;
  border-radius: 10px;
  border: 2px solid #393e46;
  padding: 20px;
  margin: 15vh auto;  
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
    margin-left: 10px;  
    padding: 8px; 
    border-radius: 5px;
    border: 1px solid #393e46;
    background: #eeeeee;
    font-size: 1rem;
  }

  button {
    cursor: pointer;
    background: linear-gradient(180deg, #f8f9fa, #d4d4d4); 
    border: 2px solid #000;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    color: #000;
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 1.2rem;
    font-family: 'Comfortaa', cursive;  
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.9;
    }
  }
`;


export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 0;

  .question-number {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #f8f9fa; 
  }

  .question-text {
    // font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin: 10px 0;
    padding: 10px 20px;
    color: #f8f9fa; 
    background: #2e2e2e; 
    border-radius: 5px;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #dcdcdc;
    font-size: 1rem;
    margin-bottom: 10px;
    width: 200px;
    background-color: #f8f9fa;
    color: #1e1e1e;
  }

  button {
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #b3b3b3);
    border: 2px solid #000;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
      background: #e0e0e0;
    }
  }
`;

