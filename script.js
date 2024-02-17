import Calculator from "./calculator.js";
const screen = document.querySelector(".screen");
const newCalculator = new Calculator(getMaxDigit());
function getMaxDigit() {
  return window.matchMedia("(max-width: 320px)").matches
    ? 5
    : window.matchMedia("(max-width: 425px)").matches
    ? 6
    : 9;
}

window.addEventListener("resize", () => {
  if (getMaxDigit() !== newCalculator.MAX_DIGITS) {
    newCalculator.updateMaxDigits(getMaxDigit());
  }
  screenValue = newCalculator.getDisplayValue();
  updateScreen();
});

const allButtons = document.querySelectorAll("button");
let screenValue = "";

const SPECIAL_KEYS_MAP = {
  C: "Escape",
  "⌫": "Backspace",
  "=": "Enter",
  "×": "*",
  "÷": "/",
  "-": "-",
};
const handleButton = (button) => {
  console.log(button);
  newCalculator.handleButtons(button);
  screenValue = newCalculator.getDisplayValue();
  updateScreen();
};
const buttonClick = (event) => {
  const button =
    SPECIAL_KEYS_MAP[event.target.innerHTML] || event.target.innerHTML;
  handleButton(button);
};
allButtons.forEach((button) => {
  button.addEventListener("click", buttonClick);
});
function updateScreen() {
  screen.innerHTML = "";
  for (let i = 0; i < screenValue.length; i++) {
    const digitSpan = document.createElement("span");
    digitSpan.textContent = screenValue[i];
    screen.appendChild(digitSpan);
  }
}
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  handleButton(e.key);
});
