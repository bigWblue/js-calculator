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
    while (total.includes('*') || total.includes('/')) {
        const parsedPrecedence = multiplyOrDivide(total);
        total = parsedPrecedence;
        if (['*', '/', '.'].includes(total[total.length-1]) || /[*/+]{2,}|-[*/+]+/.test(operation)) {
            total = 'Error';
        }
    }
    
    while (isNaN(total)) {
        const partialResult = addOrSubtract(total);
        total = partialResult;
        if (total === 'Error') {
            break;
        }
    }
    
    return total;
}