import React, {useState} from "react";

// Define the Calculator component
const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");

  // Handle keyboard input with type annotation
  const handleKeyboardInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const key = event.key;
    event.preventDefault();

    // Allow only digits, operators, parentheses, and decimals
    if (
      (key >= "0" && key <= "9") ||
      ["+", "-", "*", "/", ".", "(", ")"].includes(key)
    ) {
      setInput((prev) => prev + key);
    } else if (key === "Enter") {
      solve();
    } else if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      clearScreen();
    }
  };

  // Clear the screen
  const clearScreen = () => setInput("");

  // Display values in the input
  const display = (val: string) => setInput((prev) => prev + val);

  // Solve the mathematical expression
  const solve = () => {
    try {
      let expression = input
        .replace(/√/g, "Math.sqrt(")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/sin/g, "Math.sin(")
        .replace(/cos/g, "Math.cos(")
        .replace(/tan/g, "Math.tan(")
        .replace(/log/g, "Math.log10(")
        .replace(/ln/g, "Math.log(")
        .replace(/EXP/g, "Math.exp(")
        .replace(/\^/g, "**");

      // Add closing parentheses for functions as needed
      [
        "Math.sqrt(",
        "Math.sin(",
        "Math.cos(",
        "Math.tan(",
        "Math.log10(",
        "Math.log(",
        "Math.exp(",
      ].forEach((func) => {
        if (expression.includes(func)) {
          expression += ")";
        }
      });

      // Evaluate the expression
      // eslint-disable-next-line no-eval
      setInput(eval(expression).toString());
    } catch (error) {
      console.error(error);
      setInput("Error");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{textAlign: "center"}}>Calculator</h1>

      <div>
        <input
          type="text"
          id="result"
          className="screen"
          style={styles.screen}
          value={input}
          onKeyDown={handleKeyboardInput}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={clearScreen}
          style={{...styles.button, ...styles.clear}}
        >
          C
        </button>
      </div>

      <div style={styles.keys}>
        {[
          "7",
          "8",
          "9",
          "/",
          "sin",
          "cos",
          "tan",
          "4",
          "5",
          "6",
          "*",
          "log",
          "ln",
          "e",
          "1",
          "2",
          "3",
          "-",
          "π",
          "EXP",
          "^",
          "0",
          ".",
          "=",
          "+",
        ].map((value) => (
          <button
            key={value}
            onClick={() => (value === "=" ? solve() : display(value))}
            style={
              value === "="
                ? {...styles.button, ...styles.equalSign}
                : styles.button
            }
          >
            {value}
          </button>
        ))}
        <button onClick={() => display("√")} style={styles.button}>
          √
        </button>
        <button onClick={() => display("(")} style={styles.button}>
          (
        </button>
        <button onClick={() => display(")")} style={styles.button}>
          )
        </button>
      </div>
    </div>
  );
};

// Styling for the calculator
const styles: {[key: string]: React.CSSProperties} = {
  container: {
    border: "1px solid #cccccc",
    boxShadow: "10px 10px 30px 0px rgba(0,0,0,0.75)",
    borderRadius: "20px",
    position: "relative",
    margin: "20px auto",
    padding: "20px",
    width: "100%",
    maxWidth: "550px",
  },
  screen: {
    textAlign: "right",
    color: "black",
    fontSize: "medium",
    width: "100%",
    maxWidth: "390px",
    height: "35px",
    cursor: "pointer",
    padding: "10px 20px",
    margin: "auto",
  },
  keys: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 60px)",
    gridGap: "10px",
    padding: "10px",
    margin: "auto",
  },
  button: {
    height: "60px",
    padding: "5px",
    fontSize: "2rem",
    color: "#333",
    backgroundColor: "transparent",
    borderRadius: "3px",
    border: "1px solid #c4c4c4",
    backgroundImage:
      "linear-gradient(to bottom, transparent, transparent 50%, rgba(0,0,0,.04))",
    boxShadow:
      "inset 0 0 0 1px rgba(255,255,255,.05), inset 0 1px 0 0 rgba(255,255,255,.45), inset 0 -1px 0 0 rgba(255,255,255,.15), 0 1px 0 0 rgba(255,255,255,.15)",
    textShadow: "0 1px rgba(255,255,255,.4)",
  },
  clear: {
    backgroundColor: "#f0595f",
    borderColor: "#b0353a",
    color: "#fff",
    width: "50px",
    height: "50px",
    padding: "5px",
  },
  equalSign: {
    backgroundColor: "#25a8e0",
    color: "#fff",
  },
};


export default Calculator;
