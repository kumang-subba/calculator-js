import Calculator from "./calculator.js";
const screen = document.querySelector(".screen");
const newCalculator = new Calculator();

const allButtons = document.querySelectorAll("button");
const buttonClick = (event) => {
  const button = event.target.innerHTML;
  console.log(button);
  newCalculator.handleButtons(button);
  screen.value = newCalculator.updateScreen();
};
allButtons.forEach((button) => {
  button.addEventListener("click", buttonClick);
});
