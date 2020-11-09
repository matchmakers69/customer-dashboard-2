import { NOT_RESALABLE, RESALABLE, RESALE_ENABLED } from '../../../constants';

import getResaleTickets from './getResaleTickets';

describe('getResaleTickets', () => {
  it('should return tickets that are eligible for resale, or resold', () => {
    const state = {
      booking: {
        PW143245: {
          reference: 'PW143245',
          family_booking: true,
          departure_date: {
            iso_value: '2019-06-07',
          },
          return_date: {
            iso_value: '2019-06-08',
          },
          tickets: [
            { resale: RESALABLE },
            { resale: RESALE_ENABLED },
            { resale: NOT_RESALABLE },
          ],
          pax: [],
        },
      },
    };

    expect(getResaleTickets(state, 'PW143245')).toEqual([
      { resale: RESALABLE },
      { resale: RESALE_ENABLED },
    ]);
  });

  it('should return empty array when booking only contains non-resalable tickets', () => {
    const state = {
      booking: {
        PW143245: {
          reference: 'PW143245',
          departure_date: {
            iso_value: '2019-06-07',
          },
          return_date: {
            iso_value: '2019-06-08',
          },
          tickets: [
            { resale: NOT_RESALABLE },
            { resale: NOT_RESALABLE },
            { resale: NOT_RESALABLE },
          ],
          pax: [],
        },
      },
    };

    expect(getResaleTickets(state, 'PW143245')).toEqual([]);
  });

  it('should return empty array when booking has not loaded', () => {
    const state = {
      booking: {},
    };

    expect(getResaleTickets(state, 'PW143245')).toEqual([]);
  });

  it('should NOT return pax names where pax cannot be found', () => {
    const state = {
      booking: {
        PW143245: {
          reference: 'PW143245',
          family_booking: false,
          departure_date: {
            iso_value: '2019-06-07',
          },
          return_date: {
            iso_value: '2019-06-08',
          },
          pax: [],
          tickets: [{ resale: RESALABLE, pax_id: 1 }],
        },
      },
    };

    expect(getResaleTickets(state, 'PW143245')).toEqual([
      { resale: RESALABLE, pax_id: 1 },
    ]);
  });

  it('should return pax names when pax exists and names are NOT empty', () => {
    const state = {
      booking: {
        PW143245: {
          reference: 'PW143245',
          family_booking: false,
          departure_date: {
            iso_value: '2019-06-07',
          },
          return_date: {
            iso_value: '2019-06-08',
          },
          pax: [
            {
              id: 1,
              personal_details: {
                first_name: 'John',
                last_name: 'Smith',
              },
            },
          ],
          tickets: [{ resale: RESALABLE, pax_id: 1 }],
        },
      },
    };

    expect(getResaleTickets(state, 'PW143245')).toEqual([
      { resale: RESALABLE, pax_id: 1, pax: 'John Smith' },
    ]);
  });
});
