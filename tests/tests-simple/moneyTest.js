import { formatCurrency } from '../../scripts/utils/money.js';

console.log('test suite: formatCurrency');

console.log('converts cents into dollars');
// test 1 (also known as a test case)
// this is a basic test case (a type of test case), which tests if the code is working CORRECTLY or not
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
}
else {
  console.log('failed');
}
console.log('works with 0');
// test 2
// these two below are edge cases; they test with trickier values like 0
if (formatCurrency(0) === '0.00') {
  console.log('passed')
}
else {
  console.log('failed');
}

console.log('rounds up to the nearest cent');
if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
}
else {
  console.log('failed');
}

console.log('rounds down to the nearest cent');
if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
}
else {
  console.log('failed');
}

