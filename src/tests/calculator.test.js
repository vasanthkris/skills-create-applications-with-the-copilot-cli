const assert = require('node:assert/strict');
const test = require('node:test');

const { calculate } = require('../calculator');

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

test('rejects unsupported operators', () => {
  assert.throws(
    () => calculate(2, '^', 3),
    { message: 'Supported operations are +, -, *, and /.' },
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
