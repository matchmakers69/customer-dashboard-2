import getCurrentPath from './getCurrentPath';

describe('getCurrentPath', () => {
  it(`it should return the current router path`, () => {
    const state = {
      router: {
        location: {
          pathname: '/this-is-a-route',
        },
      },
    };

    expect(getCurrentPath(state)).toEqual('/this-is-a-route');
  });
});
