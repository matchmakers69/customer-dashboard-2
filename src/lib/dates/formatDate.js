import { format, isAfter, isSameDay, isSameMonth, isSameYear } from 'date-fns';

const formatSameMonth = (startDate, endDate) => {
  const formattedStartDate = format(startDate, 'Do');
  const formattedEndDate = format(endDate, 'Do MMMM YYYY');

  return `${formattedStartDate} - ${formattedEndDate}`;
};

const formatSameYear = (startDate, endDate) => {
  const formattedStartDate = format(startDate, 'Do MMMM');
  const formattedEndDate = format(endDate, 'Do MMMM YYYY');

  return `${formattedStartDate} - ${formattedEndDate}`;
};

const formatDates = (startDate, endDate) => {
  const formattedStartDate = format(startDate, 'Do MMMM YYYY');
  const formattedEndDate = format(endDate, 'Do MMMM YYYY');

  return `${formattedStartDate} - ${formattedEndDate}`;
};

export const formatDate = date => format(date, 'dddd Do MMMM YYYY');

export const formatDateRange = (startDate, endDate) => {
  if (isAfter(startDate, endDate)) {
    return null;
  }
  if (isSameDay(startDate, endDate)) {
    return formatDate(startDate);
  }
  if (isSameMonth(startDate, endDate)) {
    return formatSameMonth(startDate, endDate);
  }
  if (isSameYear(startDate, endDate)) {
    return formatSameYear(startDate, endDate);
  }
  return formatDates(startDate, endDate);
};
