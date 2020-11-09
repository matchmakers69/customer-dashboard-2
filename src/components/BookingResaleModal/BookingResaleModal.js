import { RESALABLE, RESALE_ENABLED } from '../../constants';
import React, { Fragment, PureComponent } from 'react';

import Modal from '../Modal';
import { Prompt } from '@kaboodle-solutions/design-system';
import PropTypes from 'prop-types';
import styles from './BookingResaleModal.styles';
import withStyles from 'react-jss';

class BookingResaleModal extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    modifications: PropTypes.array.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    tickets: PropTypes.array.isRequired,
  };

  getTicketModifications(status) {
    const { tickets, modifications } = this.props;

    // We only want modifications of type {status}
    const filtered = modifications.filter(
      modification => modification.status === status,
    );

    // Return the ticket name with the modification for presentation.
    const filteredWithName = filtered.map(modification => {
      const { name } = tickets.find(ticket => ticket.id === modification.id);
      return {
        ...modification,
        name,
      };
    });

    return filteredWithName;
  }

  render() {
    const { classes, onDismiss, onSubmit } = this.props;

    const ticketsResale = this.getTicketModifications(RESALE_ENABLED);
    const ticketsResalable = this.getTicketModifications(RESALABLE);

    return (
      <Modal>
        <Prompt
          header="Confirmation"
          actions={[
            {
              type: 'default',
              text: 'Cancel',
              onClick: onDismiss,
            },
            {
              type: 'success',
              text: 'Proceed',
              onClick: onSubmit,
            },
          ]}
          onClickOutside={onDismiss}>
          <p className={classes.proceedNotice}>
            By clicking proceed the following changes will occur.
          </p>
          {ticketsResale.length > 0 && (
            <Fragment>
              <p>
                The following tickets will be available for others to purchase.
              </p>
              <ul className={classes.resaleList}>
                {ticketsResale.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </Fragment>
          )}
          {ticketsResalable.length > 0 && (
            <Fragment>
              <p>
                The following tickets will no longer be available for resale.
              </p>
              <ul className={classes.resalableList}>
                {ticketsResalable.map(({ id, name }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </Fragment>
          )}
        </Prompt>
      </Modal>
    );
  }
}

export default withStyles(styles)(BookingResaleModal);
