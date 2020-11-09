import { formatDate, formatDateRange } from './formatDate';

describe('formatDate', () => {
  it('should format correctly', () => {
    const date = new Date('1979-01-01T14:00:00');

    const output = 'Monday 1st January 1979';

    expect(formatDate(date)).toEqual(output);
  });
});

describe('formatDateRange', () => {
  it('should format correctly when both dates are on the same day', () => {
    const startDate = new Date('1979-01-01T14:00:00');
    const endDate = new Date('1979-01-01T17:00:00');

    const output = 'Monday 1st January 1979';

    expect(formatDateRange(startDate, endDate)).toEqual(output);
  });

  it('should format correctly when both dates are on different days of the same month', () => {
    const startDate = new Date('1979-01-01T14:00:00');
    const endDate = new Date('1979-01-03T17:00:00');

    const output = '1st - 3rd January 1979';

    expect(formatDateRange(startDate, endDate)).toEqual(output);
  });

  it('should format correctly when both dates are on different days of different months within the same year', () => {
    const startDate = new Date('1979-01-01T14:00:00');
    const endDate = new Date('1979-02-03T17:00:00');

    const output = '1st January - 3rd February 1979';

    expect(formatDateRange(startDate, endDate)).toEqual(output);
  });

  it('should format correctly when both dates are on different days of different months  of different years', () => {
    const startDate = new Date('1979-01-01T14:00:00');
    const endDate = new Date('1980-02-03T17:00:00');

    const output = '1st January 1979 - 3rd February 1980';

    expect(formatDateRange(startDate, endDate)).toEqual(output);
  });

  it('should return null when start date is after the end date', () => {
    const startDate = new Date('1979-02-01T17:00:00');
    const endDate = new Date('1979-01-01T14:00:00');

    const output = null;

    expect(formatDateRange(startDate, endDate)).toEqual(output);
  });
});
