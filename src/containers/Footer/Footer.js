import { Col, Grid } from '@kaboodle-solutions/design-system';
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import styles from './Footer.styles';
import withStyles from 'react-jss';

const Footer = ({ displayFooter, classes }) => (
  <Fragment>
    {displayFooter && (
      <div className={classes.footer}>
        <Grid className={classes.grid}>
          <Col sm={12} lg={6}>
            <div className={classes.logo} />
          </Col>
          <Col sm={12} lg={6}>
            <div className={classes.terms}>
              <p className={classes.termParagraph}>
                Kaboodle Solutions LTD registered in England and Wales No.
                09654103
              </p>
              <p className={classes.termParagraph}>
                VAT 221 7962 10, 3 The Stables, Wilmslow Road, Manchester, M20
                5PG
              </p>
              <a
                href={constants.PRIVACY_POLICY_LINK}
                target="_blank"
                className={classes.link}
                rel="noopener noreferrer">
                Privacy Policy
              </a>

              <a
                href={constants.TERMS_AND_CONDITIONS_LINK}
                target="_blank"
                className={classes.link}
                rel="noopener noreferrer">
                Terms and Conditions
              </a>
            </div>
          </Col>
        </Grid>
      </div>
    )}
  </Fragment>
);

Footer.propTypes = {
  classes: PropTypes.shape({
    footer: PropTypes.string.isRequired,
    grid: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    terms: PropTypes.string.isRequired,
    termParagraph: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  displayFooter: PropTypes.bool,
};

Footer.defaultProps = {
  displayFooter: true,
};

export const mapStateToProps = state => ({
  displayFooter: state.ui.displayFooter,
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null,
  ),
)(Footer);
