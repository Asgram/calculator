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
            return add(a,b);
        case '-':
            return sub(a,b);
        case 'x':
            return mult(a,b);
        case '/':
            return divide(a,b);
        default:
            return;
    }
}