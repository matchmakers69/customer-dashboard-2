import { Col, Grid, WrapLoader } from '@kaboodle-solutions/design-system';
import React, { PureComponent } from 'react';
import {
  areCountriesLoaded,
  getClientCountriesFormArray,
} from '../../selectors/client';
import {
  getBookingDelivery,
  getBookingDeliveryAddressFormObject,
  isBookingLoaded,
  isBookingPrinted,
} from '../../selectors/booking';
import { goToRoute, withParams } from '../../lib/router';

import BackButton from '../../components/BackButton';
import BookingAddressForm from '../../components/BookingAddressForm';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bookingOperations } from '../../store/booking';
import { clientOperations } from '../../store/client';
import { connect } from 'react-redux';
import constants from '../../constants';
import noop from 'lodash/noop';
import styles from './BookingAddressPage.styles';
import withStyles from 'react-jss';

class BookingAddressPage extends PureComponent {
  static propTypes = {
    address: PropTypes.shape({
      address_1: PropTypes.string.isRequired,
      address_2: PropTypes.string,
      address_3: PropTypes.string,
      city: PropTypes.string.isRequired,
      county: PropTypes.string.isRequired,
      postcode: PropTypes.string.isRequired,
      country: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
      }).isRequired,
    }),
    bookingLoaded: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    countries: PropTypes.array.isRequired,
    delivery: PropTypes.array.isRequired,
    getBooking: PropTypes.func.isRequired,
    getCountries: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    loaded: PropTypes.bool,
    match: PropTypes.object.isRequired,
    printed: PropTypes.bool.isRequired,
    updateBookingDelivery: PropTypes.func.isRequired,
  };

  static defaultProps = {
    address: null,
    bookingLoaded: false,
    loaded: false,
  };

  componentDidMount() {
    const { bookingLoaded, getBooking, getCountries, match } = this.props;

    // Only load the booking if it hasn't been loaded already (e.g. if you land on this page).
    if (!bookingLoaded) {
      getBooking(match.params.booking_reference);
    }

    // Retrieve countries for the 'Country' dropdown.
    getCountries();
  }

  render() {
    const {
      match: {
        params: { booking_reference: bookingReference },
      },
      countries,
      address,
      delivery,
      loaded,
      printed,
      updateBookingDelivery,
      goTo,
      classes,
    } = this.props;

    const bookingUrl = withParams(constants.BOOKING_URL, {
      booking_reference: bookingReference,
    });

    // If there isn't a physical delivery option on the booking, return to booking.
    if (
      loaded &&
      (!delivery.length || !delivery[0].require_address || printed)
    ) {
      return <Redirect to={bookingUrl} />;
    }

    return (
      <div className={classes.container}>
        <Grid>
          <Col xs={12} sm={6}>
            <BackButton onClick={() => goTo(bookingUrl)} />
            {loaded ? (
              <BookingAddressForm
                address={address}
                countries={countries}
                onSubmit={updateBookingDelivery}
                bookingReference={bookingReference}
                allocationId={delivery[0].allocation_id}
              />
            ) : (
              <WrapLoader message="Loading">
                <BookingAddressForm
                  address={{
                    address_1: '',
                    address_2: '',
                    address_3: '',
                    city: '',
                    county: '',
                    postcode: '',
                    country: {
                      label: '',
                      value: '',
                    },
                  }}
                  countries={[]}
                  onSubmit={noop}
                  bookingReference=""
                  allocationId={0}
                />
              </WrapLoader>
            )}
          </Col>
          <Col className={classes.paddedColumn} lg={6} />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const bookingReference = ownProps.match.params.booking_reference;
  return {
    countries: getClientCountriesFormArray(state, bookingReference),
    address: getBookingDeliveryAddressFormObject(state, bookingReference),
    delivery: getBookingDelivery(state, bookingReference),
    bookingLoaded: isBookingLoaded(state, bookingReference),
    loaded:
      isBookingLoaded(state, bookingReference) && areCountriesLoaded(state),
    printed: isBookingPrinted(state, bookingReference),
  };
};

const mapDispatchToProps = {
  getBooking: bookingOperations.getBooking,
  getCountries: clientOperations.getCountries,
  updateBookingDelivery: bookingOperations.updateBookingDelivery,
  goTo: goToRoute,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(BookingAddressPage));
