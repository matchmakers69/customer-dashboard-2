/* eslint-disable import/no-unassigned-import */
import '@babel/polyfill';
import 'jest-date-mock';

import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import noop from 'lodash/noop';

// Fixes scrollTo errors on tests that call it.
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

configure({ adapter: new Adapter() });

// The console.error and console.warn spies for the current test.
let consoleError = null;
let consoleWarn = null;

beforeEach(() => {
  // Store the console.error and console.warn spies so we can access them later.
  consoleError = jest.spyOn(console, 'error');
  consoleWarn = jest.spyOn(console, 'warn');

  // Clear mock states between tests.
  jest.clearAllMocks();
});

// Fail tests if console.error or console.warn is called.
afterEach(() => {
  expect(consoleError).toHaveBeenCalledTimes(0);
  expect(consoleWarn).toHaveBeenCalledTimes(0);
});
