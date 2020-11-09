import getBooking from './getBooking';

describe('getBooking', () => {
  it('should return specified booking', () => {
    const state = {
      booking: {
        loaded: true,
        error: null,
        PW3076840: {
          reference: 'PW3076840',
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
          agent: {
            id: 457878,
            value: 'John Smith',
          },
        },
        HO3235322: {
          reference: 'HO3235322',
          created_date: {
            iso_value: '2019-02-27 01:20:02',
            isotz_value: '2019-02-27T01:20:02+00:00',
          },
          completed_date: {
            iso_value: '2019-02-27 01:32:47',
            isotz_value: '2019-02-27T01:32:47+00:00',
          },
          status: {
            code: 70,
            value: 'Complete',
          },
          agent: {
            id: 457878,
            value: 'Joe Bloggs',
          },
        },
      },
    };

    expect(getBooking(state, 'PW3076840')).toEqual({
      reference: 'PW3076840',
      created_date: {
        iso_value: '2019-02-27 01:20:02',
        isotz_value: '2019-02-27T01:20:02+00:00',
      },
      completed_date: {
        iso_value: '2019-02-27 01:32:47',
        isotz_value: '2019-02-27T01:32:47+00:00',
      },
      status: {
        code: 70,
        value: 'Complete',
      },
      agent: {
        id: 457878,
        value: 'John Smith',
      },
    });
  });

  it('should return empty object when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBooking(state, 'PW3076840')).toEqual({});
  });
});
