import getClient from './getClient';

describe('getClient', () => {
  it(`it should return the client object`, () => {
    const state = {
      client: {
        genders: ['Male', 'Female', 'Prefer not to say'],
      },
    };

    expect(getClient(state)).toEqual(state.client);
  });
});
