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
            return Math.min(Math.max(add(a, b), 1e-14), 999999999);
        case '-':
            return Math.max(Math.ceil(sub(a, b) * 1e5) / 1e5, 1e-14);
        case 'x':
            return Math.min(Math.ceil(mult(a, b) * 1e5) / 1e5, 999999999);
        case '/':
            let quotient = divide(a, b);
            return typeof (quotient) === 'string' ? quotient
                : Math.max(Math.ceil(quotient * 1e5) / 1e5, 1e-14);
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
    let symbol = false;
    //let isFloat = false;

    keys.forEach(element => {
        element.onmousedown = () => {
            isFirstTime ? solution.textContent = chooseKey(element.getAttribute('id'))
                : solution.textContent += chooseKey(element.getAttribute('id'));
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
            console.log(num1 + " " + operator + " " + num2);
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
        if (solution.textContent === ""){
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
        console.log(num1 + " " + operator + " " + num2);
        console.log(isFirstTime);
        num1 = solution.textContent;
        num2 = "";
        operator = "";
    }

    point.onmousedown = () => {
        if(Number.isInteger(Number(solution.textContent))) {
            solution.textContent += ".";
        }
    }

    numSymbol.onmousedown = () => {
        let first = solution.textContent.slice(0,1);
        if(first === "+"){
            first = solution.textContent.slice(1);
            solution.textContent = "-" + first;
        } else if (first === "-") {
            first = solution.textContent.slice(1);
            solution.textContent = "+" + first;
        } else solution.textContent = "-" + solution.textContent;
        adder ? num2 = solution.textContent : num1 = solution.textContent;
    }
}

function chooseKey(idName) {
    switch (idName) {
        case 'number-symbol': return 'LATER';
        default: return idName;
    }
}