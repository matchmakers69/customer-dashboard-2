import { Col, Grid } from '@kaboodle-solutions/design-system';
import React, { useEffect } from 'react';
import {
  getCustomerGenderFormObject,
  isCustomerLoaded,
} from '../../selectors/customer';

import BackButton from '../../components/BackButton';
import ProfileGenderForm from '../../components/ProfileGenderForm';
import PropTypes from 'prop-types';
import { clientOperations } from '../../store/client';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import { customerOperations } from '../../store/customer';
import { getClientGendersFormArray } from '../../selectors/client';
import { goToRoute } from '../../lib/router';
import styles from './ProfileGenderPage.styles';
import withStyles from 'react-jss';

const ProfileGenderPage = ({
  classes,
  loading,
  getGenders,
  gender,
  genderOptions,
  updateCustomer,
  goTo,
}) => {
  useEffect(() => {
    getGenders();
  }, []);
  return (
    <div className={classes.pageLayout}>
      <Grid>
        <Col xs={12} sm={6} lg={4}>
          <BackButton onClick={() => goTo(constants.PROFILE_DETAILS_URL)} />

          {loading ? (
            'Loading'
          ) : (
            <ProfileGenderForm
              gender={gender}
              genderOptions={genderOptions}
              onSubmit={updateCustomer}
            />
          )}
        </Col>
      </Grid>
    </div>
  );
};

ProfileGenderPage.propTypes = {
  classes: PropTypes.object.isRequired,
  gender: PropTypes.object,
  genderOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  getGenders: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  updateCustomer: PropTypes.func.isRequired,
};

ProfileGenderPage.defaultProps = {
  gender: null,
  loading: true,
};

const mapStateToProps = state => ({
  genderOptions: getClientGendersFormArray(state),
  gender: isCustomerLoaded(state) ? getCustomerGenderFormObject(state) : null,
  loading: !isCustomerLoaded(state),
});

const mapDispatchToProps = {
  getGenders: clientOperations.getGenders,
  updateCustomer: customerOperations.updateCustomer,
  goTo: goToRoute,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProfileGenderPage);
