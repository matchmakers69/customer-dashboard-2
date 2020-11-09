import { Col, Grid, WrapLoader } from '@kaboodle-solutions/design-system';
import { getCustomerDOB, isCustomerLoaded } from '../../selectors/customer';

import BackButton from '../../components/BackButton';
import ProfileDateOfBirthForm from '../../components/ProfileDateOfBirthForm';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { customerOperations } from '../../store/customer';
import { goToRoute } from '../../lib/router';
import styles from './ProfileDateOfBirthPage.styles';
import withStyles from 'react-jss';

const ProfileDateOfBirthPage = ({
  classes,
  dateOfBirth,
  updateCustomer,
  goTo,
  loading,
}) => (
  <div className={classes.pageLayout}>
    <Grid>
      <Col xs={12} sm={6} lg={4}>
        <BackButton onClick={() => goTo(constants.PROFILE_DETAILS_URL)} />
        {loading ? (
          <WrapLoader message="Loading">
            <ProfileDateOfBirthForm />
          </WrapLoader>
        ) : (
          <ProfileDateOfBirthForm
            dateOfBirth={dateOfBirth}
            onSubmit={updateCustomer}
          />
        )}
      </Col>
    </Grid>
  </div>
);

ProfileDateOfBirthPage.propTypes = {
  classes: PropTypes.object.isRequired,
  dateOfBirth: PropTypes.instanceOf(Date),
  goTo: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  updateCustomer: PropTypes.func.isRequired,
};

ProfileDateOfBirthPage.defaultProps = {
  dateOfBirth: null,
  loading: false,
};

const mapStateToProps = state => ({
  dateOfBirth: isCustomerLoaded(state) ? getCustomerDOB(state) : null,
  loading: !isCustomerLoaded(state),
});

const mapDispatchToProps = {
  updateCustomer: customerOperations.updateCustomer,
  goTo: goToRoute,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProfileDateOfBirthPage);
