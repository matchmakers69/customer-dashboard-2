import { mount, shallow } from 'enzyme';

import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider } from 'react-jss';
import { blankTheme } from '@kaboodle-solutions/design-system';

const Providers = ({ initialEntries, children }) => (
  <ThemeProvider theme={blankTheme}>
    <MemoryRouter keyLength={0} initialEntries={initialEntries}>
      {children}
    </MemoryRouter>
  </ThemeProvider>
);

Providers.propTypes = {
  children: PropTypes.element.isRequired,
  initialEntries: PropTypes.arrayOf(PropTypes.string),
};

Providers.defaultProps = {
  initialEntries: undefined,
};

const mountWithConfig = (component, options) =>
  mount(component, { ...options, wrappingComponent: Providers });

const shallowWithConfig = (component, options) =>
  shallow(component, { ...options, wrappingComponent: Providers });

export { Providers, mountWithConfig, shallowWithConfig };
