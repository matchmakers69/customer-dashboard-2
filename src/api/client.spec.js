import { getCountries, getGenders } from './client';

import { get } from 'axios';

jest.mock('axios');

describe('getGenders', () => {
  it('should make a GET request to /api/client/genders', async () => {
    get.mockReturnValue(
      Promise.resolve({
        data: {
          genders: ['Male', 'Female', 'Prefer not to say'],
        },
      }),
    );

    await getGenders();

    expect(get).toHaveBeenCalledWith('/api/client/genders');
  });
});

describe('getCountries', () => {
  it('should make a GET request to /api/client/countries', async () => {
    get.mockReturnValue(
      Promise.resolve({
        data: {
          countries: [
            {
              id: 1,
              code: 'AF',
              name: 'Afghanistan',
            },
          ],
        },
      }),
    );

    await getCountries();

    expect(get).toHaveBeenCalledWith('/api/client/countries');
  });
});
