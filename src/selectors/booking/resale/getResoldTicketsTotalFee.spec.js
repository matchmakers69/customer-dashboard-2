import { RESALABLE, RESALE_SOLD } from '../../../constants';

import getResoldTicketsTotalFee from './getResoldTicketsTotalFee';

describe('getResoldTicketsTotalFee', () => {
  it('should return sum of resold ticket booking fees', () => {
    const state = {
      booking: {
        PW143245: {
          tickets: [
            { resale: RESALABLE },
            {
              resale: RESALE_SOLD,
              prices: {
                booking_fee: {
                  value: 2,
                },
              },
            },
            {
              resale: RESALE_SOLD,
              prices: {
                booking_fee: {
                  value: 4,
                },
              },
            },
          ],
        },
      },
    };

    expect(getResoldTicketsTotalFee(state, 'PW143245')).toEqual(6);
  });
});
