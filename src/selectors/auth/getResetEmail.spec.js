import getResetEmail from './getResetEmail';

describe('getResetEmail', () => {
  it('it should return reset email from state', () => {
    const state = {
      auth: {
        resetEmail: 'test@kaboodle.co.uk',
      },
    };

    expect(getResetEmail(state)).toEqual('test@kaboodle.co.uk');
  });
});
