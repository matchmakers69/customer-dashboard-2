import React, { useState } from 'react';

import InputFieldGroup from './InputFieldGroup';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash.noop';
import styles from './InputField.styles';
import withStyles from 'react-jss';

const InputField = ({
  label,
  required,
  type,
  id,
  placeholder,
  disabled,
  classes,
  errors,
  grouped,
  groupedWidth,
  valid,
  onChange,
  onBlur,
  onFocus,
  value,
}) => {
  const [focused, setFocus] = useState(false);

  const isPopulated = Boolean(value);

  const isActive = focused || isPopulated;

  const getInputClassNames = () =>
    classNames({
      [classes.inputField]: true,
      [classes.active]: isActive,
      [classes.valid]: valid && !errors.length && isPopulated,
      [classes.invalid]: errors.length && isPopulated,
      [classes.disabled]: disabled,
      [classes.grouped]: grouped,
      [classes.groupedWidth]: groupedWidth,
    });

  const handleChange = event => {
    onChange(event);
  };

  const handleBlur = event => {
    setFocus(false);
    onBlur(event);
  };

  const handleFocus = event => {
    setFocus(true);
    onFocus(event);
  };

  return (
    <div className={getInputClassNames()}>
      <label className={classes.label} htmlFor={id}>
        {label} {required && <span className={classes.required}>*</span>}
      </label>
      <input
        className={classes.input}
        type={type}
        name={id}
        id={id}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
      />
      {isPopulated &&
        errors.map(error => (
          <span key={error} className={classes.error}>
            {error}
          </span>
        ))}
    </div>
  );
};

InputField.propTypes = {
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  errors: PropTypes.array,
  grouped: PropTypes.bool,
  groupedWidth: PropTypes.number,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  valid: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InputField.defaultProps = {
  classes: {},
  disabled: false,
  errors: [],
  grouped: false,
  groupedWidth: 6,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  placeholder: '',
  required: false,
  type: 'text',
  valid: null,
  value: '',
};

InputField.Group = InputFieldGroup;

export default withStyles(styles)(InputField);
