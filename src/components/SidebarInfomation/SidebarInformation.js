import PropTypes from 'prop-types';
import React from 'react';
import { Title } from '@kaboodle-solutions/design-system';
import camelCase from 'lodash/camelCase';

const SidebarInformation = ({ title, children }) => (
  <>
    <Title testId={`SidebarInformation-${camelCase(title)}`}>{title}</Title>
    {children}
  </>
);

SidebarInformation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  title: PropTypes.string.isRequired,
};

export default SidebarInformation;
