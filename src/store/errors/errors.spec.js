import { ERROR_OCCURRED } from './types';
import { createError } from './actions';
import reducer from './reducers';

describe('client', () => {
  it('Returns initial state when a matching actions is not passed through', () => {
    expect(reducer(undefined, { type: 'NOT_AN_ACTION' })).toEqual([]);
  });

  it(`Adds error to state when ${ERROR_OCCURRED} is dispatched`, () => {
    Date.now = jest.fn(() => 1487076708000);
    const errorTimestamp = new Date('January 1, 1970 00:00:00');

    const error = {
      code: 1234,
      timestamp: errorTimestamp,
      message: 'Something has gone horribly wrong.',
    };

    expect(
      reducer(
        [
          {
            code: 2345,
            timestamp: errorTimestamp,
            message: 'This is an existing error.',
          },
        ],
        createError(error),
      ),
    ).toMatchObject([
      {
        code: 2345,
        timestamp: errorTimestamp,
        message: 'This is an existing error.',
      },
      {
        code: 1234,
        message: 'Something has gone horribly wrong.',
      },
    ]);
  });

  it(`Adds default error to state when ${ERROR_OCCURRED} is dispatched without passing an error object`, () => {
    expect(reducer([], createError())[0]).toMatchObject({
      code: 'default',
      message: '',
    });
  });
});
