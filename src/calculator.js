#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*)
 * - division (/)
 * - modulo (%)
 * - exponentiation (^)
 * - square root (sqrt)
 */

function validateNumber(value, label) {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a valid number.`);
  }
}

function modulo(a, b) {
  validateNumber(a, 'The first operand');
  validateNumber(b, 'The second operand');

  if (b === 0) {
    throw new Error('Cannot calculate modulo by zero.');
  }

  return a % b;
}

function power(base, exponent) {
  validateNumber(base, 'The base');
  validateNumber(exponent, 'The exponent');

  return base ** exponent;
}

function squareRoot(n) {
  validateNumber(n, 'The number');

  if (n < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }

  return Math.sqrt(n);
}

const OPERATIONS = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => left / right,
  '%': modulo,
  '^': power,
};

function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('Both operands must be valid numbers.');
  }

  if (!Object.hasOwn(OPERATIONS, operator)) {
    throw new Error('Supported operations are +, -, *, /, %, and ^.');
  }

  if (operator === '/' && right === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return OPERATIONS[operator](left, right);
}

function printUsage() {
  console.error('Usage: node src/calculator.js <number> <operator> <number>');
  console.error('   or: node src/calculator.js sqrt <number>');
  console.error('Operators: +, -, *, /, %, ^, sqrt');
}

function main() {
  const [, , firstInput, operator, secondInput] = process.argv;
  if (firstInput === 'sqrt') {
    if (process.argv.length !== 4) {
      printUsage();
      process.exitCode = 1;
      return;
    }

    try {
      console.log(squareRoot(Number(operator)));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
    return;
  }

  const leftInput = firstInput;
  const rightInput = secondInput;
  const left = Number(leftInput);
  const right = Number(rightInput);

  if (process.argv.length !== 5) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    console.log(calculate(left, operator, right));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { calculate, modulo, power, squareRoot };
