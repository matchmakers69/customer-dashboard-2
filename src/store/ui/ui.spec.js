import { UPDATE_UI } from './types';
import reducer from './reducers';
import { updateUI } from './actions';

describe('auth', () => {
  it(`Returns initial state when a matching actions isn't passed through`, () => {
    expect(reducer(undefined, { type: 'NOT_AN_ACTION' })).toEqual({
      displayHeader: true,
      displayFooter: true,
      displayHeaderLinks: true,
    });
  });

  it(`updates the store object state when ${UPDATE_UI} is dispatched`, () => {
    expect(
      reducer(
        { displayHeader: false, secondValue: true },
        updateUI({ displayHeader: true }),
      ),
    ).toMatchObject({ displayHeader: true, secondValue: true });
  });
});
