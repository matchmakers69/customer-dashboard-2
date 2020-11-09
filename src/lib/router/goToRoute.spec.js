import goToRoute from './goToRoute';

describe('goToRoute', () => {
  let scrollTo = {};
  beforeEach(() => {
    // eslint-disable-next-line no-multi-assign
    scrollTo = global.scrollTo = jest.fn();
  });
  it('should produce router push action to specified path', () => {
    const action = goToRoute('/test');

    expect(action).toEqual({
      payload: {
        args: ['/test'],
        method: 'push',
      },
      type: '@@router/CALL_HISTORY_METHOD',
    });
  });

  it('should produce router push action to specified path, replacing placeholder', () => {
    const action = goToRoute('/test/:param1', { param1: 'Apple' });

    expect(action).toEqual({
      payload: {
        args: ['/test/Apple'],
        method: 'push',
      },
      type: '@@router/CALL_HISTORY_METHOD',
    });
  });

  it('should produce router push action to specified path, replacing multiple placeholders', () => {
    const action = goToRoute('/test/:param1/type/:param2', {
      param1: 'Apple',
      param2: 'Red',
    });

    expect(action).toEqual({
      payload: {
        args: ['/test/Apple/type/Red'],
        method: 'push',
      },
      type: '@@router/CALL_HISTORY_METHOD',
    });
  });

  it('should scroll to the top of the page when the option "scrollToTop" is passed', () => {
    goToRoute('/test');
    const action = goToRoute('/test');
    expect(action).toEqual({
      payload: {
        args: ['/test'],
        method: 'push',
      },
      type: '@@router/CALL_HISTORY_METHOD',
    });
    expect(scrollTo).toHaveBeenCalled();
  });

  it('should not scroll to the top of the page when the option "scrollToTop = false" is passed', () => {
    goToRoute('/test', {}, { scrollToTop: false });
    const action = goToRoute('/test', {}, { scrollToTop: false });
    expect(action).toEqual({
      payload: {
        args: ['/test'],
        method: 'push',
      },
      type: '@@router/CALL_HISTORY_METHOD',
    });
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
