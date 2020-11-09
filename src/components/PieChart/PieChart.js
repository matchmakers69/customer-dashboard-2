import PropTypes from 'prop-types';
import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { format } from 'date-fns';
import { formatPrice } from '../../lib/formatting';
import styles from './PieChart.styles';
import withStyles from 'react-jss';
import { withUI } from '@kaboodle-solutions/design-system';

const PieChart = ({
  data,
  remainingBalance,
  classes,
  theme,
  currencySymbol,
  currencyExponent,
}) => {
  const getLabel = dataObj =>
    formatPrice(currencySymbol, dataObj.value, currencyExponent);

  const getPayments = () =>
    data.map(payment => ({
      id: payment.reference,
      label: payment.paid
        ? `${payment.type}: Successful Payment on ${format(
            payment.date,
            'DD/MM/YYYY',
          )}`
        : `Unsuccessful Payment on  ${format(payment.date, 'DD/MM/YYYY')}`,
      value: Math.round(payment.amount * 1e2) / 1e2,
      color: payment.paid
        ? theme.variables.colors.typeSuccess
        : theme.variables.colors.typeDanger,
    }));

  const getOutstandingBalance = () => ({
    id: 'outstanding',
    label: 'Outstanding Amount',
    value: Math.round(remainingBalance * 1e2) / 1e2,
    color: theme.variables.colors.typeDefault,
  });

  const pieData = [...getPayments(), getOutstandingBalance()];
  return (
    <div className={classes.chartContainer}>
      <div className={classes.piePrice}>
        <span className={classes.piePriceAmount}>
          {formatPrice(currencySymbol, remainingBalance, currencyExponent)}
        </span>
        <span className={classes.piePriceRemaining}>remaining</span>
      </div>
      <ResponsivePie
        data={pieData}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        innerRadius={0.6}
        sortByValue={false}
        colors={{ datum: 'color' }}
        enableRadialLabels={false}
        enableSlicesLabels
        animate={false}
        sliceLabel={getLabel}
      />
    </div>
  );
};

PieChart.propTypes = {
  classes: PropTypes.shape({
    chartContainer: PropTypes.string.isRequired,
    piePrice: PropTypes.string.isRequired,
    piePriceAmount: PropTypes.string.isRequired,
    piePriceRemaining: PropTypes.string.isRequired,
  }).isRequired,
  currencyExponent: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      reference: PropTypes.string.isRequired,
      paid: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      amount: PropTypes.string.isRequired,
    }),
  ).isRequired,
  remainingBalance: PropTypes.number.isRequired,
  theme: PropTypes.shape({
    variables: PropTypes.shape({
      colors: PropTypes.shape({
        typeSuccess: PropTypes.string.isRequired,
        typeDanger: PropTypes.string.isRequired,
        typeDefault: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default withUI(withStyles(styles)(PieChart));
