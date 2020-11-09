/* eslint-disable react/no-array-index-key, id-length, camelcase, max-nested-callbacks, no-shadow */

import React, { Fragment } from 'react';

import BreakdownItem from './BreakdownItem';
import PropTypes from 'prop-types';
import styles from './BreakdownTable.styles';
import withStyles from 'react-jss';

const BreakdownTable = ({ heading, bookingItems, classes }) => (
  <div className={classes.BreakdownTable}>
    <div className={classes.header}>
      <div className={classes.heading}>{heading}</div>
      <div className={classes.columnQuantity}>Quantity</div>
      <div className={classes.columnPrice}>Price</div>
    </div>
    {bookingItems.map((group, i) => (
      <div key={i} className={classes.group}>
        <div className={classes.groupHeading}>{group.title}</div>
        <div key={i}>
          {group.line_items.map(
            (
              {
                title,
                subtitle,
                quantity,
                cost,
                line_items: sub_items,
                badges,
                disabled,
                costText,
              },
              i,
            ) => (
              <Fragment key={i}>
                <BreakdownItem
                  title={title}
                  subtitle={subtitle}
                  type={group.type}
                  quantity={quantity}
                  cost={cost}
                  disabled={disabled}
                  badges={badges}
                  showIcon={i === 0}
                  costText={costText}
                />
                {sub_items &&
                  sub_items.map(
                    (
                      {
                        title,
                        subtitle,
                        type,
                        quantity,
                        cost,
                        disabled,
                        badges,
                        costText,
                      },
                      i,
                    ) => (
                      <BreakdownItem
                        key={i}
                        title={title}
                        subtitle={subtitle}
                        type={type}
                        quantity={quantity}
                        cost={cost}
                        costText={costText}
                        disabled={disabled}
                        badges={badges}
                        showIcon
                        subItem
                      />
                    ),
                  )}
              </Fragment>
            ),
          )}
        </div>
      </div>
    ))}
  </div>
);

BreakdownTable.propTypes = {
  bookingItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      line_items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          subtitle: PropTypes.string,
          quantity: PropTypes.number,
          cost: PropTypes.number,
          costText: PropTypes.string,
          badges: PropTypes.arrayOf(
            PropTypes.shape({
              text: PropTypes.string.isRequired,
              type: PropTypes.string,
            }),
          ),
          line_items: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string.isRequired,
              subtitle: PropTypes.string,
              quantity: PropTypes.number,
              cost: PropTypes.number,
              badges: PropTypes.arrayOf(
                PropTypes.shape({
                  text: PropTypes.string.isRequired,
                  type: PropTypes.string,
                }),
              ),
              costText: PropTypes.string,
            }),
          ),
        }).isRequired,
      ),
    }),
  ).isRequired,
  classes: PropTypes.object,
  heading: PropTypes.string,
};

BreakdownTable.defaultProps = {
  classes: {},
  heading: '',
};

export default withStyles(styles)(BreakdownTable);
