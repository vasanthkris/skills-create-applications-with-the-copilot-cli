const assert = require('node:assert/strict');
const test = require('node:test');

const {
  calculate,
  modulo,
  power,
  squareRoot,
} = require('../calculator');

test('adds numbers from the basic operations example', () => {
  assert.equal(calculate(2, '+', 3), 5);
});

test('subtracts numbers from the basic operations example', () => {
  assert.equal(calculate(10, '-', 4), 6);
});

test('multiplies numbers from the basic operations example', () => {
  assert.equal(calculate(45, '*', 2), 90);
});

test('divides numbers from the basic operations example', () => {
  assert.equal(calculate(20, '/', 5), 4);
});

test('supports decimal operands', () => {
  assert.equal(calculate(1.5, '+', 2.25), 3.75);
  assert.equal(calculate(7.5, '-', 2.25), 5.25);
  assert.equal(calculate(2.5, '*', 4), 10);
  assert.equal(calculate(7.5, '/', 2.5), 3);
});

test('supports negative operands and results', () => {
  assert.equal(calculate(-8, '+', 3), -5);
  assert.equal(calculate(-8, '-', 3), -11);
  assert.equal(calculate(-8, '*', 3), -24);
  assert.equal(calculate(-8, '/', 2), -4);
});

test('supports zero for non-division operations', () => {
  assert.equal(calculate(0, '+', 5), 5);
  assert.equal(calculate(5, '-', 0), 5);
  assert.equal(calculate(0, '*', 5), 0);
  assert.equal(calculate(0, '/', 5), 0);
});

test('rejects division by zero', () => {
  assert.throws(
    () => calculate(20, '/', 0),
    { message: 'Cannot divide by zero.' },
  );
});

test('calculates modulo from the extended operations example', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(calculate(5, '%', 2), 1);
});

test('calculates modulo remainders for negative dividends', () => {
  assert.equal(modulo(-10, 3), -1);
});

test('rejects modulo by zero', () => {
  assert.throws(
    () => modulo(10, 0),
    { message: 'Cannot calculate modulo by zero.' },
  );
  assert.throws(
    () => calculate(10, '%', 0),
    { message: 'Cannot calculate modulo by zero.' },
  );
});

test('calculates power from the extended operations example', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(calculate(2, '^', 3), 8);
});

test('calculates square root from the extended operations example', () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(9), 3);
  assert.equal(squareRoot(0), 0);
});

test('supports fractional and negative powers', () => {
  assert.equal(power(9, 0.5), 3);
  assert.equal(power(2, -2), 0.25);
});

test('rejects square roots of negative numbers', () => {
  assert.throws(
    () => squareRoot(-1),
    { message: 'Cannot calculate the square root of a negative number.' },
  );
});

test('rejects invalid inputs for extended operations', () => {
  assert.throws(
    () => modulo(Number.NaN, 2),
    { message: 'The first operand must be a valid number.' },
  );
  assert.throws(
    () => power(2, Number.POSITIVE_INFINITY),
    { message: 'The exponent must be a valid number.' },
  );
  assert.throws(
    () => squareRoot(Number.NaN),
    { message: 'The number must be a valid number.' },
  );
});

test('rejects unsupported operators', () => {
  assert.throws(
    () => calculate(2, '&', 3),
    { message: 'Supported operations are +, -, *, /, %, and ^.' },
  );
});

test('rejects non-finite operands', () => {
  assert.throws(
    () => calculate(Number.NaN, '+', 3),
    { message: 'Both operands must be valid numbers.' },
  );
  assert.throws(
    () => calculate(3, '*', Number.POSITIVE_INFINITY),
    { message: 'Both operands must be valid numbers.' },
  );
});
