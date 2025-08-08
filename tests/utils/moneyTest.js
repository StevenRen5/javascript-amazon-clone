import { formatCurrency } from '../../scripts/utils/money.js';

// describe() function creates a test suite
describe('test suite: format Currency', () => {
  // it() function creates a test: takea a test name and a function that contains the test code
  it('converts cents into dollars', () => {
    // expect() lets us comparw a value to another value (instead of having to write an if statement),
    // and it returns an object.
    // this code checks if formatCurrency(2095) is equal to '20.95'.
    // Then it displays the result on the page
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearesr cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');;
  });

  it('works with negative numbers', () => {
    expect(formatCurrency(-500)).toEqual('-5.00');
  });
}); 