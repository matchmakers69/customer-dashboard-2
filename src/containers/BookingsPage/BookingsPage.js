import {
  Button,
  Col,
  Grid,
  Title,
  WrapLoader,
} from '@kaboodle-solutions/design-system';
import React, { PureComponent } from 'react';
import {
  areBookingsLoaded,
  getPastBookings,
  getUpcomingBookings,
} from '../../selectors/bookings';
import {
  getCustomerFullName,
  isCustomerLoaded,
} from '../../selectors/customer';

import BookingsHeader from '../../components/BookingsHeader';
import BookingsSummary from '../../components/BookingsSummary';
import CustomerActions from '../CustomerActions';
import NoBookingsFound from '../../components/NoBookingsFound';
import PropTypes from 'prop-types';
import { bookingsOperations } from '../../store/bookings';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { goToRoute } from '../../lib/router';
import noop from 'lodash/noop';
import styles from './BookingsPage.styles';
import withStyles from 'react-jss';

class BookingsPage extends PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    customerName: PropTypes.string,
    getBookings: PropTypes.func.isRequired,
    goTo: PropTypes.func,
    loaded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    classes: {},
    customerName: null,
    goTo: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeList: 'upcomingBookings',
    };
  }

  componentDidMount() {
    if (!this.props.loaded) this.props.getBookings();
  }

  updateBookingDisplay = type => this.setState({ activeList: type });

  getButtonVariant = type =>
    type === this.state.activeList ? 'primary' : 'default';

  getButtonDisabled = type => (this.props[type].length ? null : 'disabled');

  render() {
    const { customerName, loaded, classes, goTo } = this.props;
    const { activeList } = this.state;

    return loaded ? (
      <div className={classes.container}>
        <Grid>
          <Col sm={12}>
            <BookingsHeader customerName={customerName} />
          </Col>
        </Grid>
        <Grid className={classes.grid}>
          <Col xs={12} sm={12} lg={9}>
            <div className={classes.tabs}>
              <Button
                type="a"
                variant={this.getButtonVariant('upcomingBookings')}
                onClick={() => this.updateBookingDisplay('upcomingBookings')}>
                Upcoming Bookings
              </Button>
              <Button
                type="a"
                variant={this.getButtonVariant('pastBookings')}
                onClick={() => this.updateBookingDisplay('pastBookings')}>
                Past Bookings
              </Button>
            </div>
            {this.props[activeList].length ? (
              <BookingsSummary
                bookings={this.props[activeList]}
                loading={!loaded}
                goTo={goTo}
              />
            ) : (
              <NoBookingsFound type={activeList} />
            )}
          </Col>
          <Col xs={12} sm={12} lg={3}>
            <Title>Actions</Title>
            <CustomerActions />
          </Col>
        </Grid>
      </div>
    ) : (
      <div className="BookingsPage pageLayout">
        <Grid>
          <Col xs={12} sm={12} lg={9}>
            <WrapLoader message="Loading your bookings">
              <BookingsHeader customerName="Loading Name" />
              <BookingsSummary bookings={[]} loading={!loaded} goTo={noop} />
            </WrapLoader>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  upcomingBookings: getUpcomingBookings(state),
  pastBookings: getPastBookings(state),
  customerName: getCustomerFullName(state),
  loaded: isCustomerLoaded(state) && areBookingsLoaded(state),
});

const mapDispatchToProps = {
  getBookings: bookingsOperations.getBookings,
  goTo: goToRoute,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(BookingsPage);
