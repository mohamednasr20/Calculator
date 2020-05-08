const calculator = document.querySelector(".container");
const keys = document.querySelector(".keys");
const screen = document.querySelector(".screen");
const operates = document.querySelectorAll(".operator");

const calc = (x, y, operater) => {
  switch (operater) {
    case "add":
      return x + y;
      break;
    case "substract":
      return x - y;
      break;
    case "multiply":
      return x * y;
      break;
    case "divide":
      return y === 0 ? "ERROR" : x / y;
      break;
    case "percent":
      return (x / y) * 100;
      break;
  }
};

const restart = () => {
  window.location.reload();
};

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const display = screen.textContent;

    if (!action) {
      operates.forEach((k) => k.classList.remove("active"));
      if (display === "0" || calculator.classList.contains("ready")) {
        screen.textContent = keyContent;
        calculator.classList.remove("ready");
      } else {
        screen.textContent += keyContent;
      }
    } else if (
      action === "add" ||
      action === "substract" ||
      action === "multiply" ||
      action === "divide" ||
      action === "percent"
    ) {
      let secondValue = parseFloat(display);
      let firstValue = parseFloat(calculator.dataset.firstNum);
      let operator = calculator.dataset.operator;
      if (firstValue && operator && secondValue) {
        screen.textContent = calc(firstValue, secondValue, operator);
        if (firstValue && operator && secondValue && action === "percent") {
          screen.textContent = `${calc(firstValue, secondValue, operator)}%`;
        }
      }
      if (calculator.classList.contains("ready")) screen.textContent = display;
      calculator.dataset.firstNum = screen.textContent;

      calculator.classList.add("ready");
      key.classList.add("active");
      calculator.dataset.firstNum = screen.textContent;
      calculator.dataset.operator = action;
    } else if (action === "clear") {
      restart();
    } else if (action === "delete") {
      screen.textContent = display.slice(0, display.length - 1);
      if (screen.textContent === "") {
        restart();
      }
    } else if (action === "point") {
      screen.textContent += keyContent;
    } else if (action === "calculate") {
      if (
        !calculator.dataset.firstNum ||
        !calculator.dataset.operator ||
        calculator.classList.contains("ready")
      ) {
        return;
      }
      let firstNum = parseFloat(calculator.dataset.firstNum);
      let operator = calculator.dataset.operator;
      let secondNum = parseFloat(display);
      screen.textContent = calc(firstNum, secondNum, operator);
      calculator.dataset.firstNum = screen.textContent;
      calculator.classList.add("ready");
    }
  }
});
