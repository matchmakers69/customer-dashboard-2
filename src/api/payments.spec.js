import {
  createPayment,
  getPaymentPlanProjection,
  updatePaymentPlanDetails,
} from './payments';
import { get, post, put } from 'axios';

jest.mock('axios');

describe('getBooking', () => {
  const projection = [
    {
      date: {
        iso_value: '2020-03-29 00:00:00',
        isotz_value: '2020-03-29T00:00:00+00:00',
      },
      price: {
        value: 2105,
        currency: {
          code: 'GBP',
          symbol: '£',
          exponent: 2,
        },
      },
    },
  ];

  it('should make a GET request to /api/booking/TF3180529/paymentplan/projection sans day', async () => {
    get.mockReturnValue(
      Promise.resolve({
        data: {
          projection,
        },
      }),
    );

    await getPaymentPlanProjection({ bookingReference: 'TF3180529' });

    expect(get).toHaveBeenCalledWith(
      '/api/booking/TF3180529/paymentplan/projection',
      { params: { day: undefined } },
    );
  });

  it('should make a GET request to /api/booking/TF3180529/paymentplan/projection with day', async () => {
    get.mockReturnValue(
      Promise.resolve({
        data: {
          projection,
        },
      }),
    );

    await getPaymentPlanProjection({ bookingReference: 'TF3180529', day: 14 });

    expect(get).toHaveBeenCalledWith(
      '/api/booking/TF3180529/paymentplan/projection',
      { params: { day: 14 } },
    );
  });
});

describe('updatePaymentPlanDetails', () => {
  it('should make a PUT request to /api/booking/TF3180529/paymentplan with payment deets', async () => {
    put.mockReturnValue(Promise.resolve({ data: { success: true } }));

    const fields = {
      id: 'pm_1GIZ8aFmIEl4IrWC0aBQxP4J',
      card_number: '4242',
      cardholder_name: 'Testy McTestface',
      bookingReference: 'TF3180529',
    };

    await updatePaymentPlanDetails({
      bookingReference: 'TF3180529',
      ...fields,
    });

    expect(put).toHaveBeenCalledWith(
      '/api/booking/TF3180529/paymentplan',
      fields,
    );
  });
});

describe('createPayment', () => {
  it('should make a POST request to /api/payment with payment deets', async () => {
    post.mockReturnValue(
      Promise.resolve({
        data: {
          payment: {
            reference: 'CO-0003950340',
            paid: true,
            trace_number: null,
          },
        },
      }),
    );

    const fields = {
      bookingId: '3389027',
      bookingPax: '5533021',
      card_number: '4242',
      card_type: 'card',
      cardholder_name: 'Test Testerton',
      expiry_date: { exp_month: 4, exp_year: 2024 },
      payment_amount: 1000,
      payment_method: 'pm_1GPv3OFmIEl4IrWCW0vFPOgy',
      city: 'Josianneview',
      country: 'US',
      line1: '1299 Norma Place',
      line2: '',
      postal_code: '48574',
      state: 'Texas',
    };

    await createPayment({
      ...fields,
    });

    expect(post).toHaveBeenCalledWith('/api/payment/', fields);
  });
});
