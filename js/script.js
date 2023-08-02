function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mult(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? "UNDEFINED" : a / b;
}

function operate(symbol, a, b) {
    switch (symbol) {
        case '+':
            return Math.min(Math.max(parseFloat(add(a, b).toFixed(3)), -9999999999), 9999999999);
        case '-':
            return Math.min(Math.max(parseFloat(sub(a, b).toFixed(3)), -9999999999), 9999999999);
        case '*':
            return Math.min(Math.max(parseFloat(mult(a, b).toFixed(3)), -9999999999), 9999999999);
        case '/':
            let quotient = divide(a, b);
            return typeof (quotient) === 'string' ? quotient
                : Math.min(Math.max(parseFloat(quotient.toFixed(3)), -9999999999), 9999999999);
        default:
            return;
    }
}

window.onload = () => {
    const keys = document.querySelectorAll('.key');
    const operators = document.querySelectorAll('.operator');
    const clear = document.getElementById('clear');
    const backspace = document.getElementById('backspace');
    const percentage = document.getElementById('percentage');
    const point = document.getElementById('point');
    const numSymbol = document.getElementById('number-symbol');

    const solution = document.getElementById('numeric-solution');

    let num1 = "";
    let num2 = "";
    let operator = "";

    let isFirstTime = true;
    let adder = false;
    let disabledButtons = false;

    keys.forEach(element => {
        element.onmousedown = () => {
            if (isFirstTime) {
                solution.textContent = element.getAttribute('id');
            } else if (solution.textContent.length < 14) {
                solution.textContent += element.getAttribute('id');
            }
            isFirstTime = false
            if (disabledButtons) {
                operators.forEach(btn => {
                    disabledButtons = false;
                    btn.disabled = false;
                })
            }
        };
    });

    operators.forEach(element => {
        element.onmousedown = () => {
            if (!isFirstTime && !adder) {
                num1 = solution.textContent;
            } else if (!isFirstTime) {
                num2 = solution.textContent;
                solution.textContent = operate(operator, +num1, +num2);
                num1 = solution.textContent;
            }
            if (num1 === "UNDEFINED") {
                operators.forEach(btn => {
                    disabledButtons = true;
                    btn.disabled = true;
                })
            }
            if (element.getAttribute('id') !== 'equal') {
                operator = element.getAttribute('id');
                adder = true;
            } else adder = false;
            isFirstTime = true;
        }
    });

    clear.onclick = () => {
        isFirstTime = true;
        adder = false;
        solution.textContent = '0';
        num1 = "";
        num2 = "";
        operator = "";
        if (disabledButtons) {
            operators.forEach(btn => {
                disabledButtons = false;
                btn.disabled = false;
            })
        }
    }

    backspace.onclick = () => {
        solution.textContent = solution.textContent.slice(0, -1);
        if (solution.textContent === "") {
            solution.textContent = "0";
            isFirstTime = true;
        }
        if (disabledButtons) {
            isFirstTime = true;
            adder = false;
            solution.textContent = '0';
            num1 = "";
            num2 = "";
            operator = "";
            operators.forEach(btn => {
                disabledButtons = false;
                btn.disabled = false;
            })
        }
    }

    percentage.onclick = () => {
        solution.textContent = operate('/', +solution.textContent, 100);
        adder = false;
        num1 = solution.textContent;
        num2 = "";
        operator = "";
    }

    point.onmousedown = () => {
        if (Number.isInteger(Number(solution.textContent))) {
            solution.textContent += ".";
            isFirstTime = false;
        }
    }

    numSymbol.onmousedown = () => {
        let first = solution.textContent.slice(0, 1);
        if (first === "+") {
            first = solution.textContent.slice(1);
            solution.textContent = "-" + first;
        } else if (first === "-") {
            first = solution.textContent.slice(1);
            solution.textContent = "+" + first;
        } else solution.textContent = "-" + solution.textContent;
        adder ? num2 = solution.textContent : num1 = solution.textContent;
    }

    window.addEventListener("keydown", (e) => {
        if (Number.isInteger(Number(e.key))) {
            if (isFirstTime) {
                solution.textContent = e.key
            } else if (solution.textContent.length < 14) {
                solution.textContent += e.key;
            }

            isFirstTime = false
            if (disabledButtons) {
                operators.forEach(btn => {
                    disabledButtons = false;
                    btn.disabled = false;
                })
            }
        } else if (e.key === '+' ||
            e.key === '-' || e.key === '*' ||
            e.key === '/' || e.key === "Enter") {
            if (!isFirstTime && !adder) {
                num1 = solution.textContent;
            } else if (!isFirstTime) {
                num2 = solution.textContent;
                solution.textContent = operate(operator, +num1, +num2);
                num1 = solution.textContent;
            }
            if (num1 === "UNDEFINED") {
                operators.forEach(btn => {
                    disabledButtons = true;
                    btn.disabled = true;
                })
            }
            if (e.key !== 'Enter') {
                operator = e.key;
                adder = true;
            } else adder = false;
            isFirstTime = true;
        } else {
            switch (e.key) {
                case "%":
                    solution.textContent = operate('/', +solution.textContent, 100);
                    adder = false;
                    num1 = solution.textContent;
                    num2 = "";
                    operator = "";
                    break;
                case "Escape":
                    isFirstTime = true;
                    adder = false;
                    solution.textContent = '0';
                    num1 = "";
                    num2 = "";
                    operator = "";
                    if (disabledButtons) {
                        operators.forEach(btn => {
                            disabledButtons = false;
                            btn.disabled = false;
                        })
                    }
                    break;
                case ".":
                    if (Number.isInteger(Number(solution.textContent))) {
                        solution.textContent += ".";
                        isFirstTime = false;
                    }
                    break;
                case "Backspace":
                    solution.textContent = solution.textContent.slice(0, -1);
                    if (solution.textContent === "") {
                        solution.textContent = "0";
                        isFirstTime = true;
                    }
                    if (disabledButtons) {
                        isFirstTime = true;
                        adder = false;
                        solution.textContent = '0';
                        num1 = "";
                        num2 = "";
                        operator = "";
                        operators.forEach(btn => {
                            disabledButtons = false;
                            btn.disabled = false;
                        })
                    }
                    break;
                case "_":
                    let first = solution.textContent.slice(0, 1);
                    if (first === "+") {
                        first = solution.textContent.slice(1);
                        solution.textContent = "-" + first;
                    } else if (first === "-") {
                        first = solution.textContent.slice(1);
                        solution.textContent = "+" + first;
                    } else solution.textContent = "-" + solution.textContent;
                    adder ? num2 = solution.textContent : num1 = solution.textContent;
                    break;
                default: break;
            }
        }
    });

}