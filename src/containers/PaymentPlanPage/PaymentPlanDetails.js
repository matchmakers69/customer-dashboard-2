import { Col, Grid } from '@kaboodle-solutions/design-system';

import NextPayment from '../../components/NextPayment';
import PaymentPlanOverview from '../PaymentPlanOverview';
import PropTypes from 'prop-types';
import React from 'react';
import SettleUp from '../../components/SettleUp';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './PaymentPlanPage.styles';
import withStyles from 'react-jss';

const PaymentPlanDetails = ({
  bookingReference,
  classes,
  paymentPlan,
  paymentStatus,
}) => (
  <Grid className={classes.details}>
    <Col sm="12" md="6">
      <PaymentPlanOverview bookingReference={bookingReference} />
    </Col>
    <Col md="6">
      <div className={classes.boxNextPayment}>
        <NextPayment
          bookingReference={bookingReference}
          paymentPlan={paymentPlan}
          paymentStatus={paymentStatus}
        />
      </div>
      <div className={classes.boxSettleUp}>
        <SettleUp
          bookingReference={bookingReference}
          paymentPlan={paymentPlan}
          paymentStatus={paymentStatus}
        />
      </div>
    </Col>
  </Grid>
);

PaymentPlanDetails.propTypes = {
  bookingReference: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    details: PropTypes.string.isRequired,
    boxPieChart: PropTypes.string.isRequired,
    boxNextPayment: PropTypes.string.isRequired,
    boxSettleUp: PropTypes.string.isRequired,
  }).isRequired,
  paymentPlan: PropTypes.object.isRequired,
  paymentStatus: PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PaymentPlanDetails);
