import {
  Message,
  Table,
  Title,
  WrapLoader,
  withUI,
} from '@kaboodle-solutions/design-system';
import React, { useEffect, useRef } from 'react';
import { format, getDate } from 'date-fns';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formatPrice } from '../../lib/formatting';
import styles from './PaymentPlanProjection.styles';
import withStyles from 'react-jss';

const PaymentPlanProjection = ({
  classes,
  currencySymbol,
  currencyExponent,
  projection,
  selectedDay,
}) => {
  const loaded = projection && projection.length;

  const getRows = () => {
    if (loaded) {
      return projection.map(element => ({
        date: element.date.iso_value,
        amount: element.price.value,
      }));
    }
    return [];
  };

  const getColumns = () => {
    if (loaded) {
      const { exponent, symbol } = projection[0].price.currency;

      return [
        {
          name: 'Payment date',
          path: 'date',
          render: date => format(date, 'DD/MM/YYYY'),
        },
        {
          name: 'Amount',
          path: 'amount',
          render: amount => formatPrice(symbol, amount / 100, exponent),
        },
      ];
    }
    return [];
  };

  const getRemainingAmount = () => {
    if (loaded) {
      const remaining = projection
        .map(el => el.price.value)
        .reduce((acc, cur) => acc + cur);
      return formatPrice(currencySymbol, remaining / 100, currencyExponent);
    }
    return [];
  };

  const prevDayRef = useRef();
  useEffect(() => {
    prevDayRef.current = selectedDay;
  });
  const prevDay = prevDayRef.current;

  const rows = getRows();
  const columns = getColumns();
  const remainingAmount = getRemainingAmount();

  const shouldShowMessage = () => {
    if (selectedDay) {
      const dates = rows.map(row => getDate(row.date));
      return new Set(dates.slice(1)).size > 1;
    }
    return null;
  };

  return loaded ? (
    <div className={classes.boxProjection}>
      <Title>
        {selectedDay === null ? 'Current payment plan' : 'New payment plan'}
      </Title>
      {shouldShowMessage() && (
        <Message
          className={classes.message}
          icon="iconWarning"
          variant="warning">
          <Message.Content>
            <span className={classes.messageContent}>
              The date your payment is taken will differ in line with the last
              day of the month (i.e 28th/29th/30th/31st)
            </span>
          </Message.Content>
        </Message>
      )}
      <div
        className={classNames({
          ...classes.table,
          [classes.newProjection]: selectedDay !== prevDay,
        })}>
        <Table columns={columns} rows={rows} />
      </div>
      <div className={classes.total}>
        <span id="total">Total payment remaining: {remainingAmount}</span>
      </div>
    </div>
  ) : (
    <div className={classes.boxProjection}>
      <WrapLoader message="Loading">
        <Title>Current payment plan</Title>
        <div className={classes.total}>
          <span id="total">Total payment remaining: {remainingAmount}</span>
        </div>
      </WrapLoader>
    </div>
  );
};

PaymentPlanProjection.propTypes = {
  classes: PropTypes.object,
  currencyExponent: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  projection: PropTypes.arrayOf(PropTypes.object),
  selectedDay: PropTypes.number,
};

PaymentPlanProjection.defaultProps = {
  classes: {},
  projection: [],
  selectedDay: null,
};

export default withUI(withStyles(styles)(PaymentPlanProjection));
