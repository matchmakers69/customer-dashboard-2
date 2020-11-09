const styles = ({ variables, breakpoints }) => ({
  hello: {
    composes: 'Hello',
    extend: variables.baseMobile,
    ...variables.type.h1,
    [breakpoints.lg]: {
      extend: variables.baseDesktop,
      ...variables.type.h1,
    },
    fontFamily: variables.fontFamily,
    color: variables.colors.primary,
  },
});

export default styles;
