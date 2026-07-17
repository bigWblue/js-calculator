import { evaluateDisplay } from "./calculator.js";

const display = document.getElementById('display');

const operatorKeys = document.querySelectorAll('.operator-key');
const numKeys = document.querySelectorAll('.num-key');

const equalKey = document.getElementById('equal-sign');
const clearBtn = document.querySelector('.clear-btn');
const backspaceBtn = document.querySelector('.backspace-btn');

const expandBtn = document.getElementById('expand-btn');
const extraBtnsContainer = document.getElementById('extra-btns-container');
const extraKeys = document.querySelectorAll('.extra-key');

let firstNumber = false;
function clearDisplay() {
    display.textContent = '0';
    firstNumber = false;
}

function handleBackspace() {
    const displayLastChar = display.textContent.length - 1;
    display.textContent = display.textContent.slice(0, displayLastChar)
}


function keysToDisplay(keys) {
    for (const key of keys) {
        key.addEventListener('click', () => {
            const previousChar = display.textContent[display.textContent.length - 1]
            if (firstNumber) {
                if (display.textContent.length < 18) {
                    if (key.textContent === '.' && previousChar === '.') {
                        return
                    }
                    if (key.textContent === 'x²') {
                        if (previousChar !== '²') {
                            display.textContent += '²'
                        }
                        return
                    }
                    if (key.textContent === '√') {
                        if ('-+*/'.includes(previousChar)) {
                            display.textContent += '√('
                        }
                        return;
                    }
                    display.textContent += key.textContent;
                }
            }
            else {
                if ('0123456789.-()√'.includes(key.textContent)){
                    if (key.textContent === '√') {
                        display.textContent = '√(';
                        firstNumber = true;
                        return;
                    }
                    display.textContent = key.textContent;
                    firstNumber = true;}
            }
        })
    }
}


equalKey.addEventListener('click', () => {
    const total = evaluateDisplay(display.textContent);
    display.textContent = total;
})

document.addEventListener('keydown', (e) => {
    const keyPressed = e.key;
    const btnsAndOperators = [...numKeys].concat([...operatorKeys])
    const extraBtnsArr = [...extraKeys];
    const respectiveBtn = btnsAndOperators.find(btn => btn.textContent === keyPressed);
    if (respectiveBtn) {
        if (display.textContent === 'Error') {
            clearDisplay();
        }
        respectiveBtn.click();
    }
    else if (keyPressed === 'Enter') {
        equalKey.click();
    }
    else if (keyPressed === ' ') {
        clearBtn.click();
    }
    else if (keyPressed === 'Backspace') {
        handleBackspace();
    }
    
    if ('()²q'.includes(keyPressed)) {
        const extraKeyMap = {
            '(': '(',
            ')': ')',
            '²': 'x²',
            'q': '√'
        }
        const respectiveExtraBtn = extraBtnsArr.find(btn => btn.textContent === extraKeyMap[keyPressed]);
        respectiveExtraBtn.click();
        }
    e.target.blur()
})

clearBtn.addEventListener('click', clearDisplay);
backspaceBtn.addEventListener('click', handleBackspace);

extraBtnsContainer.classList.add('hidden');
expandBtn.addEventListener('click', () => {
    extraBtnsContainer.classList.toggle('hidden');
    extraBtnsContainer.classList.toggle('expanded');
    if (extraBtnsContainer.classList.contains('hidden')) {
        expandBtn.innerText = '◀'
    }
    else {
        expandBtn.innerText = '▶'
    }
})

keysToDisplay(numKeys);
keysToDisplay(operatorKeys);
keysToDisplay(extraKeys);
