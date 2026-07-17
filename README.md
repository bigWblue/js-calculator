# JavaScript Calculator
<img width="752" height="397" alt="calculator demonstration" src="https://github.com/user-attachments/assets/9bd16aec-13e6-4e21-8c8f-a472393a769d" />

A simple calculator built on JavaScript that can work with the 4 basic operations (addition, subtraction, multiplication and division), following the proper order of operations. 

## Files
+ index.html
+ styles.css
+ calculator.js
+ userInterface.js
+ **images**
  + favicon.png
+ **localServer**
  + jsLocalServer.bat
  + pyLocalServer.bat

## Features
+ Basic Arithmetic: + - * /
+ Parentheses, squaring numbers and square roots
+ Order of operations: Follows the proper precedence from the operators in the expression.

## How to run
+ Clone this repo
+ To run the calculator you must set up a local server, you can <a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/set_up_a_local_testing_server" target="_blank">read this</a>, or:
+ + Check for extensions that do that in your code editor like **Live Preview** or **Live Server** from VS Code
  + If you have **Node.js** installed in your Windows clicking _jsLocalServer.bat_ should start a local server.
  + If you have **Python 3** installed in your Windows clicking _pyLocalServer.bat_ will start a local server.
+ With the local server running, open <a href="http://localhost:8000" target="_blank">localhost:8000</a> in your browser to use the calculator.

## Usage
+ Click or type the numbers and operators to see them in the display.
+ Click **←** or press Backspace to remove the last character in the expression.
+ Click **=** or press the Enter/Return key to evaluate the expression.
+ Click **C** or press the Space key to clear everything.
+ Click "**(**" or "**)**" or press the corresponding keys in the keyboard to open/close parentheses.
+ Click **x²** or press **²** in your keyboard after a number to square it.
+ Click **√** or press **q** to get the square root of a number (remember to close the parentheses).

## Implementation notes
+ Evaluation approach:
  + In order it checks if square roots, exponentiation to the power of 2 or parentheses are present in the given operation, if so solve them first and return an operation with only addition and subtraction to be solved by another function.
+ Current limitations:
  + No support for trigonometric functions or logarithms
+ System and browser compatibility:
  + Has only been tested on Windows desktop using Firefox

## Ideas
+ Add a collapsible menu to show more buttons ✔
+ Add parentheses support ✔
+ Add exponentiation support ✔
+ Add buttons and support for functions such a sine, cosine and tangent
