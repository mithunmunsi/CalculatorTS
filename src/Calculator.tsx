import React, { useState } from 'react';
import './style.css';

const Calculator: React.FC = () => {
  const [currentInput, setCurrentInput] = useState<string>('');
  const [previousInput, setPreviousInput] = useState<string>('');
  const [operation, setOperation] = useState<string | null>(null);

  // Function to calculate the result of the current operation
  const calculateResult = () => {
    if (previousInput && currentInput && operation) {
      const prev = parseFloat(previousInput);
      const curr = parseFloat(currentInput);

      let result = 0;
      switch (operation) {
        case '+':
          result = prev + curr;
          break;
        case '-':
          result = prev - curr;
          break;
        case '*':
          result = prev * curr;
          break;
        case '/':
          if (curr !== 0) result = prev / curr;
          break;
        case '%':
          result = prev % curr;
          break;
        case '+-':
          result = -curr;
          break;
        default:
          break;
      }

      setCurrentInput(result.toString());
      setPreviousInput('');
      setOperation(null);
    }
  };

  // Function to append a number to the current input value
  const inputNumber = (num: number | string) => {
    setCurrentInput(currentInput + num.toString());
  };

  // Function to set the current operation and move the current input value to the previous input value
  const inputOperator = (op: string) => {
    if (currentInput) {
      if (previousInput) {
        calculateResult();
      } else {
        setPreviousInput(currentInput);
        setCurrentInput('');
      }
      setOperation(op);
    }
  };

  // Function to clear the display and reset the values
  const clearDisplay = () => {
    setCurrentInput('');
    setPreviousInput('');
    setOperation(null);
  };

  return (
    <div id="calculator">
      <input type="text" id="display" value={currentInput} disabled />
      <div>
        <button onClick={clearDisplay}>C</button>
        <button onClick={() => inputOperator('%')}>%</button>
        <button onClick={() => inputOperator('+-')}>+/-</button>
      </div>

      <div>
        <button onClick={() => inputNumber(7)}>7</button>
        <button onClick={() => inputNumber(8)}>8</button>
        <button onClick={() => inputNumber(9)}>9</button>
        <button onClick={() => inputOperator('/')}>/</button>
      </div>
      <div>
        <button onClick={() => inputNumber(4)}>4</button>
        <button onClick={() => inputNumber(5)}>5</button>
        <button onClick={() => inputNumber(6)}>6</button>
        <button onClick={() => inputOperator('*')}>*</button>
      </div>
      <div>
        <button onClick={() => inputNumber(1)}>1</button>
        <button onClick={() => inputNumber(2)}>2</button>
        <button onClick={() => inputNumber(3)}>3</button>
        <button onClick={() => inputOperator('-')}>-</button>
      </div>
      <div>
        <button onClick={() => inputNumber(0)}>0</button>
        <button onClick={() => inputNumber(',')}>,</button>
        <button onClick={calculateResult}>=</button>
        <button onClick={() => inputOperator('+')}>+</button>
      </div>
    </div>
  );
};

export default Calculator;
