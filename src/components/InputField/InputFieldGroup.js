import React, { Children, cloneElement, isValidElement } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './InputFieldGroup.styles';
import withStyles from 'react-jss';

const InputFieldGroup = ({ children, classes, errors }) => {
  const inputs = Children.toArray(children).filter(child =>
    isValidElement(child),
  );

  const allActive = () =>
    inputs.every(input => Boolean(input.props.value) === true);

  const clonedInputs = inputs.map(child =>
    cloneElement(child, { grouped: true }),
  );

  const getInputGroupClassNames = () =>
    classNames({
      [classes.inputFieldGroup]: true,
      [classes.active]: allActive(),
      [classes.invalid]: errors.length && allActive(),
    });

  return (
    <div className={getInputGroupClassNames()}>
      <div className={classes.inputFieldGroupContainer}>{clonedInputs}</div>
      {allActive() &&
        errors.map(error => (
          <span key={error} className={classes.error}>
            {error}
          </span>
        ))}
    </div>
  );
};

InputFieldGroup.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.shape({
    inputFieldGroup: PropTypes.string.isRequired,
    inputFieldGroupContainer: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    invalid: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string.isRequired),
};

InputFieldGroup.defaultProps = {
  children: [],
  errors: [],
};

export default withStyles(styles)(InputFieldGroup);
