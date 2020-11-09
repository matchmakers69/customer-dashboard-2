import PropTypes from 'prop-types';
import React from 'react';
import format from 'date-fns/format';
import styles from './PaymentDeadline.styles';
import withStyles from 'react-jss';

const PaymentDeadline = ({ classes, deadline }) => {
  const formattedDate = format(deadline, 'Do MMMM YYYY');

  const isValidDate = deadline && formattedDate !== 'Invalid Date';

  return (
    <div className={classes.paymentDeadlineBox}>
      <h2>Payment deadline</h2>
      <p>{isValidDate ? formattedDate : 'You have no outstanding payments.'}</p>
    </div>
  );
};

PaymentDeadline.propTypes = {
  classes: PropTypes.shape({
    paymentDeadlineBox: PropTypes.string.isRequired,
  }).isRequired,
  deadline: PropTypes.string,
};

PaymentDeadline.defaultProps = {
  deadline: null,
};

export default withStyles(styles)(PaymentDeadline);
