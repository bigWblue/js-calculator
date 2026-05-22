# JavaScript Calculator
<img width="776" height="405" alt="calculator demonstration" src="https://github.com/user-attachments/assets/c6da983b-51ce-45a7-ab2f-66c669d5d31b" />

A simple calculator built on JavaScript that can work with the 4 basic operations (addition, subtraction, multiplication and division), following the proper order of operations. 

## Files
+ index.html
+ styles.css
+ script.js

## Features
+ Basic Arithmetic: + - * /
+ Order of operations: Follows the proper precedence from the operators in the expression.

## How to run
+ Open index.html in your browser.

## Usage
+ Click or type the numbers and operators to see them in the display.
+ Press Backspace to remove the last character in the expression.
+ Click = or press the Enter/Return key to evaluate the expression.
+ Click C or press the Space key to clear everything.

## Implementation notes
+ Evaluation approach:
  + First I check if the operators for multiplication or division are present in the given operation, if so solve them first and return an operation with only addition and subtraction to be solved by another function.
+ Current limitations:
  + No parentheses support
  + No exponentiation support
  + No support for trigonometric functions or logarithms
+ System and browser compatibility:
  + Has only been tested on windows desktop using Firefox

## Ideas
+ Add parentheses support
+ Add exponentiation support
+ Add buttons and support for functions such a sine, cosine and tangent
+ Split the JavaScript file into different modules for evaluation and handling clicks
