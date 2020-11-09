import scrollToTop from '../browser/scrollToTop';

const defaultOptions = {
  scrollToTop: true,
};

const withOptions = options => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  if (mergedOptions.scrollToTop) {
    scrollToTop();
  }
};

export default withOptions;
