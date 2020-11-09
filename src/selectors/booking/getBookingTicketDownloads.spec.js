import getBookingTicketDownloads from './getBookingTicketDownloads';

describe('getBookingTicketDownloads', () => {
  it('should return booking ticket downloads', () => {
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
          downloads: [
            {
              description: 'eTicket',
              external: false,
              type: 'ticket',
              key: 'gre34tgfdgh54tyhjsdf243',
            },
          ],
        },
      },
    };

    expect(getBookingTicketDownloads(state, 'PW3076840')).toEqual([
      {
        description: 'eTicket',
        external: false,
        type: 'ticket',
        key: 'gre34tgfdgh54tyhjsdf243',
      },
    ]);
  });

  it('should return empty array when booking has not loaded', () => {
    const state = {
      booking: {
        loaded: false,
      },
    };

    expect(getBookingTicketDownloads(state, 'PW3076840')).toEqual([]);
  });
});
