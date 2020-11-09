import { NOT_RESALABLE, RESALABLE, RESALE_ENABLED } from '../../../constants';

import isResalable from './isResalable';

describe('isResalable', () => {
  it('should return TRUE when booking contains tickets which are resalable', () => {
    const state = {
      booking: {
        PW143245: {
          tickets: [
            { resale: RESALABLE },
            { resale: RESALE_ENABLED },
            { resale: NOT_RESALABLE },
          ],
        },
      },
    };

    expect(isResalable(state, 'PW143245')).toEqual(true);
  });

  it('should return FALSE when booking only contains non-resalable tickets', () => {
    const state = {
      booking: {
        PW143245: {
          tickets: [
            { resale: NOT_RESALABLE },
            { resale: NOT_RESALABLE },
            { resale: NOT_RESALABLE },
          ],
        },
      },
    };

    expect(isResalable(state, 'PW143245')).toEqual(false);
  });

  it('should return FALSE when booking has not loaded', () => {
    const state = {
      booking: {},
    };

    expect(isResalable(state, 'PW143245')).toEqual(false);
  });
});
