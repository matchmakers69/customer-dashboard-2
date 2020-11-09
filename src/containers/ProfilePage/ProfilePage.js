import { Col, Grid, Menu, MenuEntry } from '@kaboodle-solutions/design-system';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../constants';
import styles from './ProfilePage.styles';
import withStyles from 'react-jss';

const ProfilePage = ({ classes }) => (
  <div className={classes.container}>
    <Grid>
      <Col xs={12} sm={12} lg={9} className="content">
        <h1 className={classes.header}>My Profile</h1>
        <Menu>
          <Link className={classes.link} to={constants.PROFILE_DETAILS_URL}>
            <MenuEntry>Personal Details</MenuEntry>
          </Link>
          <Link
            className={classes.link}
            to={constants.PROFILE_DETAILS_ADDRESSES_URL}>
            <MenuEntry>Address Book</MenuEntry>
          </Link>
        </Menu>
      </Col>
    </Grid>
  </div>
);

ProfilePage.defaultProps = {
  classes: {},
};

ProfilePage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ProfilePage);
