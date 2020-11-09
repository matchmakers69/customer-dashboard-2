import BookingSidebar, {
  SidebarAddress,
  SidebarDownload,
  SidebarPrice,
  SidebarResale,
  SidebarTracking,
} from '../../components/BookingSidebar';
import { Col, Grid, WrapLoader } from '@kaboodle-solutions/design-system';
import React, { PureComponent } from 'react';
import {
  getBooking,
  getBookingBreakdown,
  getBookingDelivery,
  getBookingDeliveryAddress,
  getBookingPackage,
  getBookingPaymentPlan,
  getBookingPriceValue,
  getBookingTicketDownloads,
  isBookingLoaded,
  isBookingPrinted,
  isResalable,
} from '../../selectors/booking';
import { goToRoute, withParams } from '../../lib/router';

import BookingDetails from '../../components/BookingDetails';
import ContentHero from '../ContentHero';
import { Helmet } from 'react-helmet';
import PaymentPlanMessage from '../../components/PaymentPlanMessage';
import PropTypes from 'prop-types';
import SidebarStatus from '../../components/BookingSidebar/SidebarStatus';
import { bookingOperations } from '../../store/booking';
import { compose } from 'redux';
import { connect } from 'react-redux';
import constants from '../../constants';
import styles from './BookingPage.styles';
import withStyles from 'react-jss';

class BookingPage extends PureComponent {
  static propTypes = {
    booking: PropTypes.object.isRequired,
    bookingPackage: PropTypes.any,
    bookingPrice: PropTypes.number,
    bookingReference: PropTypes.string.isRequired,
    breakdown: PropTypes.array,
    classes: PropTypes.object,
    delivery: PropTypes.array,
    deliveryAddress: PropTypes.object,
    downloads: PropTypes.array,
    getBooking: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    loaded: PropTypes.bool,
    match: PropTypes.object.isRequired,
    paymentPlan: PropTypes.oneOfType([
      PropTypes.shape({
        projection: PropTypes.arrayOf(
          PropTypes.shape({
            date: PropTypes.instanceOf(Date).isRequired,
            amount: PropTypes.number.isRequired,
          }),
        ),
      }),
      PropTypes.oneOf([false]).isRequired,
    ]).isRequired,
    printed: PropTypes.bool.isRequired,
    resalable: PropTypes.bool,
  };

  static defaultProps = {
    bookingPackage: {
      title: null,
      startDate: null,
      endDate: null,
    },
    bookingPrice: 0,
    breakdown: null,
    classes: {},
    delivery: [],
    deliveryAddress: null,
    downloads: [],
    loaded: false,
    resalable: false,
  };

  constructor(props) {
    super(props);
    this.props.getBooking(this.props.match.params.booking_reference);
  }

  // eslint-disable-next-line max-lines-per-function
  render() {
    const {
      bookingReference,
      booking,
      breakdown,
      downloads,
      bookingPrice,
      goTo,
      loaded,
      bookingPackage,
      deliveryAddress,
      classes,
      delivery,
      paymentPlan,
      printed,
      resalable,
    } = this.props;

    return (
      <div className="BookingPage">
        <Helmet
          title={
            loaded
              ? `${bookingPackage.title} - ${constants.PAGE_TITLE_SUFFIX}`
              : constants.PAGE_TITLE_SUFFIX
          }
        />
        <div className={classes.contentHeader}>
          <ContentHero bookingReference={bookingReference} />
        </div>
        {paymentPlan && (
          <Grid className={classes.container}>
            <Col xs={12} sm={12}>
              <PaymentPlanMessage
                paymentPlan={paymentPlan}
                goToPaymentPlan={() =>
                  goTo(
                    withParams(constants.BOOKING_PAYMENT_PLAN_VIEW_URL, {
                      booking_reference: bookingReference,
                    }),
                  )
                }
              />
            </Col>
          </Grid>
        )}
        <Grid className={classes.container}>
          <Col xs={12} sm={12} lg={9}>
            <div className="BookingPage__content">
              {loaded ? (
                <div className={classes.details}>
                  <BookingDetails breakdown={breakdown} />
                </div>
              ) : (
                <div className={classes.details}>
                  <WrapLoader>
                    <BookingDetails />
                  </WrapLoader>
                </div>
              )}
            </div>
          </Col>
          <Col xs={12} sm={12} lg={3}>
            {loaded ? (
              <div className="BookingPage__sidebar">
                <BookingSidebar>
                  <SidebarPrice totalPrice={bookingPrice} />
                  <SidebarStatus code={booking.payment_status.code} />
                  <SidebarDownload downloads={downloads} />
                  {delivery.length > 0 && delivery[0].tracking_id && (
                    <SidebarTracking trackingId={delivery[0].tracking_id} />
                  )}
                  {deliveryAddress && (
                    <SidebarAddress
                      deliveryAddress={deliveryAddress}
                      printed={printed}
                      goToBooking={() =>
                        goTo(
                          withParams(constants.BOOKING_UPDATE_DELIVERY_URL, {
                            booking_reference: bookingReference,
                          }),
                        )
                      }
                    />
                  )}
                  {resalable && (
                    <SidebarResale
                      resaleLink={withParams(constants.BOOKING_RESALE_URL, {
                        booking_reference: bookingReference,
                      })}
                    />
                  )}
                </BookingSidebar>
              </div>
            ) : (
              <div className="BookingPage__sidebar">
                <WrapLoader>
                  <BookingSidebar>
                    <SidebarPrice totalPrice={bookingPrice} />
                    <SidebarDownload downloads={downloads} />
                  </BookingSidebar>
                </WrapLoader>
              </div>
            )}
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const bookingReference = ownProps.match.params.booking_reference;
  return {
    bookingReference,
    paymentPlan: getBookingPaymentPlan(state, bookingReference),
    booking: getBooking(state, bookingReference),
    bookingPackage: getBookingPackage(state, bookingReference),
    breakdown: getBookingBreakdown(state, bookingReference),
    downloads: [...getBookingTicketDownloads(state, bookingReference)],
    bookingPrice: getBookingPriceValue(state, bookingReference),
    loaded: isBookingLoaded(state, bookingReference),
    deliveryAddress: getBookingDeliveryAddress(state, bookingReference),
    delivery: getBookingDelivery(state, bookingReference),
    printed: isBookingPrinted(state, bookingReference),
    resalable: isResalable(state, bookingReference),
  };
};

const mapDispatchToProps = {
  getBooking: bookingOperations.getBooking,
  goTo: goToRoute,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(BookingPage);
