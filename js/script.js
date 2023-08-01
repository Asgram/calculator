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
    return b === 0 ? "CANNOT DIVIDE BY 0" : a / b;
}

function operate(symbol, a, b) {
    switch (symbol) {
        case '+':
            return add(a, b);
        case '-':
            return sub(a, b);
        case 'x':
            return mult(a, b);
        case '/':
            return Math.ceil(divide(a, b)*100000)/100000;
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

    const solution = document.getElementById('numeric-solution');

    let num1 = "";
    let num2 = "";
    let operator = "";
    let firstTime = true;
    let adder = false;

    keys.forEach(element => {
        element.onclick = () => {
            firstTime ? solution.textContent = chooseKey(element.getAttribute('id'))
                : solution.textContent += chooseKey(element.getAttribute('id'));
            firstTime = false
        };
    });

    operators.forEach(element => {
        element.onclick = () => {
            if(!firstTime && !adder){
                num1 = solution.textContent;
                console.log(num1 + " " + operator);
            } else if(!firstTime){
                num2 = solution.textContent;
                solution.textContent = operate(operator, +num1, +num2);
                num1 = solution.textContent;
            }
            if(element.getAttribute('id') !== 'equal'){
                operator = element.getAttribute('id');
                adder = true;
            } else adder = false;
            firstTime = true;
        }
    });

    clear.onclick = () => {
        firstTime = true;
        adder = false;
        solution.textContent = '0';
        num1 = "";
        num2 = "";
        operator = "";
    }

}

function chooseKey(idName) {
    switch (idName) {
        case 'number-symbol': return 'LATER';
        default: return idName;
    }
}