import { Col, Grid } from '@kaboodle-solutions/design-system';
import React, { Fragment, PureComponent } from 'react';

import BookingCard from '../BookingCard';
import { BookingCardActions } from '../BookingCardActions';
import BookingMonth from './BookingMonth';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import { startOfMonth } from 'date-fns';
import styles from './BookingsSummary.styles';
import withStyles from 'react-jss';

class BookingsSummary extends PureComponent {
  static propTypes = {
    bookings: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        reference: PropTypes.string.isRequired,
        package_name: PropTypes.string.isRequired,
        booked_date: PropTypes.shape({
          iso_value: PropTypes.string.isRequired,
          isotz_value: PropTypes.string.isRequired,
        }).isRequired,
        booking_status: PropTypes.shape({
          code: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }).isRequired,
        departure_date: PropTypes.shape({
          iso_value: PropTypes.string.isRequired,
          isotz_value: PropTypes.string.isRequired,
        }).isRequired,
        return_date: PropTypes.shape({
          iso_value: PropTypes.string.isRequired,
          isotz_value: PropTypes.string.isRequired,
        }).isRequired,
        currency: PropTypes.shape({
          id: PropTypes.string.isRequired,
          iso_code: PropTypes.string.isRequired,
          exponent: PropTypes.string.isRequired,
          symbol: PropTypes.string.isRequired,
        }).isRequired,
        payment_deadline_date: PropTypes.shape({
          iso_value: PropTypes.string.isRequired,
          isotz_value: PropTypes.string.isRequired,
        }).isRequired,
        payment_status: PropTypes.shape({
          code: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }).isRequired,
        booking_price: PropTypes.shape({
          price: PropTypes.string.isRequired,
          value: PropTypes.number.isRequired,
        }).isRequired,
        room_allocation_enabled: PropTypes.bool.isRequired,
        coach_allocation_enabled: PropTypes.bool.isRequired,
      }),
    ),
    classes: PropTypes.object,
    goTo: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    bookings: [],
    classes: {},
    loading: false,
  };

  getBookingsByMonth = () => {
    const bookingsWithMonthYear = this.props.bookings.map(booking => ({
      ...booking,
      monthYear: startOfMonth(booking.departure_date.iso_value),
    }));

    return groupBy(bookingsWithMonthYear, 'monthYear');
  };

  render() {
    const { goTo, classes, loading } = this.props;

    const bookingsByMonth = this.getBookingsByMonth();

    return (
      <div className="BookingsSummary">
        <div className="BookingsSummary__upcoming">
          {loading ? (
            <BookingCard
              title="Loading Event Data"
              reference="LOADING"
              startDate="1970-01-01"
              price="99.99"
            />
          ) : (
            <Fragment>
              {Object.keys(bookingsByMonth).map(key => (
                <Grid key={key} className={classes.container}>
                  <Col sm={2} xl={1}>
                    <BookingMonth date={key} />
                  </Col>
                  <Col sm={10} xl={11}>
                    {bookingsByMonth[key].map(booking => {
                      const {
                        id,
                        reference,
                        package_name,
                        departure_date: { iso_value: start_date },
                        return_date: { iso_value: end_date },
                        booking_price: { value: booking_price },
                        payment_type,
                      } = booking;

                      return (
                        <BookingCard
                          key={id}
                          title={package_name}
                          reference={reference}
                          startDate={start_date}
                          endDate={end_date}
                          price={booking_price}>
                          <BookingCardActions
                            bookingReference={reference}
                            goTo={goTo}
                            paymentType={payment_type}
                          />
                        </BookingCard>
                      );
                    })}
                  </Col>
                </Grid>
              ))}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BookingsSummary);
