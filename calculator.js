export default function Calculator(maxDigit) {
  const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const OPERATORS = ["+", "-", "*", "/"];

  let displayValue = "";
  let storedOperator = null;
  let waitingForSecondOperand = false;
  let firstNumber = undefined;
  let MAX_DIGITS = maxDigit;

  function isDecimal() {
    return displayValue.includes(".");
  }

  this.updateMaxDigits = (newMaxDigit) => {
    MAX_DIGITS = newMaxDigit;
  };
  function numberButton(numberString) {
    if (!displayValue) return (displayValue = numberString);
    if (waitingForSecondOperand) {
      displayValue = numberString;
      waitingForSecondOperand = false;
      return;
    }
    displayValue += numberString;
  }

  function convertToNumber(string) {
    return !isNaN(string) ? +string : null;
  }
  this.getDisplayValue = function () {
    const num = parseFloat(displayValue);
    if (!isNaN(num)) {
      if (num % 1 !== 0) {
        const decimalIndex = displayValue.toString().indexOf(".");
        if (displayValue.toString().length - decimalIndex - 1 > MAX_DIGITS) {
          displayValue = num.toFixed(MAX_DIGITS);
        }
      } else if (num !== 0 && (Math.abs(num) >= 1e9 || Math.abs(num) < 1e-9)) {
        displayValue = num.toExponential(MAX_DIGITS - 4);
      }
    }
    displayValue = displayValue.toString();
    displayValue = displayValue.slice(0, MAX_DIGITS);
    return displayValue;
  };

  function reset() {
    displayValue = "";
    storedOperator = null;
    waitingForSecondOperand = false;
    firstNumber = undefined;
  }

  function handleOperator(newOperator) {
    if (!displayValue && !firstNumber) {
      if (newOperator === "-") displayValue += newOperator;
      return;
    }
    if (waitingForSecondOperand) {
      return (storedOperator = newOperator);
    }
    if (storedOperator) {
      displayValue = performCalculation(
        firstNumber,
        displayValue,
        storedOperator
      );
    }
    storedOperator = newOperator;
    waitingForSecondOperand = true;
    firstNumber = displayValue;
  }

  function performCalculation(num1, num2, operator) {
    num1 = convertToNumber(num1);
    num2 = convertToNumber(num2);
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
    }
  }

  function backspace() {
    displayValue = displayValue.slice(0, -1);
  }

  function handleDecimal() {
    if (displayValue.length >= MAX_DIGITS) return;
    if (!isDecimal()) {
      if (!displayValue || waitingForSecondOperand) {
        displayValue = "0.";
      } else {
        displayValue += ".";
      }
    }
  }

  function calculate() {
    if (!displayValue || !firstNumber || !storedOperator || waitingForSecondOperand) {
      return;
    }
    if (displayValue === "0" && storedOperator === "/") {
      return (displayValue = "Error:Infinity");
    }
    displayValue = performCalculation(
      firstNumber,
      displayValue,
      storedOperator
    );
    storedOperator = null;
  }

  function buttonFunctions(button) {
    switch (button) {
      case "Escape":
        reset();
        break;
      case "Backspace":
        backspace();
        break;
      case ".":
        handleDecimal();
        break;
      case "Enter":
        calculate();
        break;
      default:
        return;
    }
  }

  this.handleButtons = function (button) {
    if (NUMBERS.includes(button)) {
      if (displayValue.length >= MAX_DIGITS && !waitingForSecondOperand) return;
      if (button === "0" && displayValue === "0") return;
      numberButton(button);
    } else {
      if (OPERATORS.includes(button)) {
        handleOperator(button);
      } else {
        buttonFunctions(button);
      }
    }
  };
}
