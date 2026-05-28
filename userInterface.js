import { evaluateDisplay } from "./calculator.js";

const display = document.getElementById('display');

const operatorKeys = document.querySelectorAll('.operator-key');
const numKeys = document.querySelectorAll('.num-key');
const equalKey = document.getElementById('equal-sign');
const clearBtn = document.querySelector('.clear-btn');
const backspaceBtn = document.querySelector('.backspace-btn');


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
            if (firstNumber) {
                if (display.textContent.length < 18) {
                    display.textContent += key.textContent;
                }
            }
            else {
                if ('0123456789.-'.includes(key.textContent)){
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
})

clearBtn.addEventListener('click', clearDisplay);
backspaceBtn.addEventListener('click', handleBackspace);

keysToDisplay(numKeys);
keysToDisplay(operatorKeys);