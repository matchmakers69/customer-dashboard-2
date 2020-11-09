import React, { Fragment } from 'react';

import BreakdownTable from '../BreakdownTable';
import PropTypes from 'prop-types';

const BookingDetails = ({ breakdown }) => (
  <div className="BookingDetails">
    <Fragment>
      <BreakdownTable heading="Booking Summary" bookingItems={breakdown} />
    </Fragment>
  </div>
);

BookingDetails.propTypes = {
  breakdown: PropTypes.array,
};

BookingDetails.defaultProps = {
  breakdown: [
    {
      title: 'Accomodation',
      type: 'accommodation',
      line_items: [
        {
          title: 'Accommodation Item 1',
          subtitle: 'Accommodation Item 1 - Subtitle',
          quantity: 1,
          cost: 99.99,
        },
      ],
    },
  ],
};

export default BookingDetails;
