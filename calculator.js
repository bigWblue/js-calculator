function validateOperation(operation) {
    let isValid = true;
    const beginnerChars = /^[^-\d]/;
    const innerOperatorsRegex = /(?<=\D)[+-](?=\d)|(?<=\d)[+-](?=\D)|(?<=\D)[+-](?=\D)/;
    const firstCharsCheck = beginnerChars.test(operation);
    const innerOperatorsCheck = innerOperatorsRegex.test(operation);
    if (firstCharsCheck || innerOperatorsCheck) {
        isValid = false;
    }
    return isValid;
}

// convert .5 into 0.5
function fixFloat(firstOpr) {
    const operands = firstOpr.split(/(?<=\d)[+-](?=-?\.?\d)/);
    let newOperation = [];
    operands.forEach(opr => {
        let minusSign = '';
        if (opr[0] === '-') {
            minusSign = '-';
            opr = opr.slice(1,)
        }
        if (/^\.\d+/.test(opr)) {
            newOperation.push(`${minusSign}0${opr}`);
        }
        else {
            newOperation.push(minusSign + opr);
        }
        minusSign = '';
    })
    const operator = firstOpr.search(/(?<=\d)[+-]/);
    return newOperation.join(firstOpr[operator]);
}

function handleSquareRoot(operation) {
    const sqrtRegex = /√\(((?:\d+\.)?\d+[^)]*)\)/;
    const match = operation.match(sqrtRegex);
    if (!match) {
        return operation;
    }
    if (match[1] < 0 || isNaN(match[1])) {
        return 'Error'
    }
    const squareRoot = Math.sqrt(Number(match[1]));
    const replaced = operation.replace(`√(${match[1]})`, `${squareRoot}`)
    return replaced
}

function handleSquare(operation) {
    const squareRegex = /(?:\d+\.)?\d+(?=²)/;
    const match = operation.match(squareRegex);
    if (!match || /(?<=\))²/.test(operation)) {
        return 'Error';
    }
    const squared = match[0] * match[0];
    return operation.replaceAll(`${match[0]}²`, squared)
}


function validateParentheses(operation) {
    let isValid = true;
    const countParentheses = {
        'open': 0,
        'close': 0,
        'inOrder': '',
        'total': 0
    }
    for (const char of operation) {
        if (char === '(') {
            countParentheses['open'] += 1;
            countParentheses['total'] += 1;
            countParentheses['inOrder'] += char
        }
        else if (char === ')') {
            countParentheses['close'] += 1;
            countParentheses['total'] += 1;
            countParentheses['inOrder'] += char
        }
    }

    if (countParentheses.open !== countParentheses.close || countParentheses.total % 2 !== 0) {
        isValid = false;
        return isValid;
    }

    let pairs = countParentheses['inOrder'].slice();
    for (let i = 0; i < (countParentheses.total / 2); i++) {
        const pairRemoved = pairs.replace('()', '');
        pairs = pairRemoved;
    }

    if (pairs !== '') {
        isValid = false;
        return isValid;
    }
    return isValid
}

function handleParentheses(operation) {
    if (!validateParentheses(operation)) {
        return 'Error'
    }
    const parenthesesRegex = /\([-+/*\d]+\)/;
    const match = operation.match(parenthesesRegex);
    if (!match) {
        return 'Error'
    }
    const innerOperation = match[0].slice(1, match[0].length-1);
    let innerResult = innerOperation;

    let maxCap = 0;
    while (/[-+*/]/.test(innerResult)) {
        maxCap += 1;
        innerResult = multiplyOrDivide(innerResult);
        if (!isNaN(innerResult) || maxCap >= 10000) {
            break
        }
        innerResult = addOrSubtract(innerResult);
    }
    if (maxCap >= 100 || innerResult.includes('Error')) {
        return 'Error'
    }
    const replaced = operation.replaceAll(match[0], innerResult);
    return replaced;
}

function addOrSubtract(operationStr) {
    const firstOperationRegex = /-?\d*\.?\d+[+-]\d*\.?\d+/;
    const match = operationStr.match(firstOperationRegex);
    
    let firstOpMatch = match ? match[0] : '';
    if (firstOpMatch.includes('.')) {
        firstOpMatch = fixFloat(firstOpMatch);
    }
    if (!match || !validateOperation(firstOpMatch)) {
        return 'Error'
    }
    const remaining = operationStr.replace(firstOperationRegex, '');
    
    let [operandOne, operandTwo] = firstOpMatch.split(/(?<=\d)[+-](?=-?\d)/);
    operandOne = Number(operandOne);
    operandTwo = Number(operandTwo);
    if (Number.isNaN(operandOne) || Number.isNaN(operandTwo)) {
        return 'Error'
    }
    let total = 0;
    
    if (firstOpMatch.includes('+')) {
        total += operandOne + operandTwo;
    }
    else {
        total += operandOne - operandTwo;
    }
    
    return `${total}${remaining}`;
}

function multiplyOrDivide(operationStr) {
    const multiDivisionRegex = /-?\d*\.?\d+[*/]-?\d*\.?\d+/;
    const match = operationStr.match(multiDivisionRegex);
    if (!match) {
        return operationStr;
    }
    const matchIndex = match.index;
    const matchLength = match[0].length;
    let prev = operationStr.slice(0,matchIndex);
    const after = operationStr.slice(matchIndex+matchLength,);
    let [operandOne, operandTwo] = match[0].split(/(?<=\d)[*/](?=-?\d)/);
    operandOne = Number(operandOne);
    operandTwo = Number(operandTwo);
    
    let total;
    if (match[0].includes('*')) {
        total = operandOne * operandTwo;
    }
    else {
        total = operandOne / operandTwo;
    }
    if (total < 0) {
        if (prev[prev.length-1] === '+') {
            prev = prev.slice(0,prev.length-1)
        }
        else if (prev[prev.length-1] === '-') {
            prev = prev.slice(0,prev.length-1) + '+';
            total *= -1;
        }
    }
    return `${prev}${total}${after}`
}

export function evaluateDisplay(operation) {
    let total = operation;
    let loopCount = 0;

    while (total.includes('√')) {
        loopCount += 1;
        const prev = handleSquareRoot(total);
        total = prev;
        if (loopCount > 20 || total === 'Error') {
            break;
        }
    }
    
    while (total.includes('²')) {
        loopCount += 1;
        const prev = handleSquare(total);
        total = prev;
        if (loopCount > 20 || total === 'Error') {
            break;
        }
    }

    while (total.includes('(') || total.includes(')')) {
        loopCount += 1;
        const prev = handleParentheses(total);
        if (prev === 'Error' || loopCount > 20) {
            break;
        }
        total = prev;
    }

    while (total.includes('*') || total.includes('/')) {
        loopCount += 1;
        if (loopCount > 20) {break}
        const parsedPrecedence = multiplyOrDivide(total);
        total = parsedPrecedence;
        if (['*', '/', '.'].includes(total[total.length-1]) || /[*/+]{2,}|-[*/+]+/.test(operation)) {
            total = 'Error';
            break;
        }
    }
    
    while (isNaN(total)) {
        loopCount += 1;
        const partialResult = addOrSubtract(total);
        total = partialResult;
        if (total === 'Error' || loopCount > 20) {
            break;
        }
    }
    
    return total;
}
