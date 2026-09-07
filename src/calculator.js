#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting only:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*)
 * - division (/)
 */

const OPERATIONS = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => left / right,
};

function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('Both operands must be valid numbers.');
  }

  if (!Object.hasOwn(OPERATIONS, operator)) {
    throw new Error('Supported operations are +, -, *, and /.');
  }

  if (operator === '/' && right === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return OPERATIONS[operator](left, right);
}

function printUsage() {
  console.error('Usage: node src/calculator.js <number> <operator> <number>');
  console.error('Operators: +, -, *, /');
}

function main() {
  const [, , leftInput, operator, rightInput] = process.argv;
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

module.exports = { calculate };
