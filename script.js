import Calculator from "./calculator.js";
const screen = document.querySelector(".screen");
const newCalculator = new Calculator();

const allButtons = document.querySelectorAll("button");
let screenValue = ""
const buttonClick = (event) => {
  const button = event.target.innerHTML;
  newCalculator.handleButtons(button);
  screenValue = newCalculator.getDisplayValue();
  updateScreen()

};
allButtons.forEach((button) => {
  button.addEventListener("click", buttonClick);
});
function updateScreen(){
  screen.innerHTML = ""
  for (let i = 0; i <screenValue.length; i++){
    const digitSpan = document.createElement("span")
    digitSpan.textContent = screenValue[i]
    screen.appendChild(digitSpan)
  }
}
