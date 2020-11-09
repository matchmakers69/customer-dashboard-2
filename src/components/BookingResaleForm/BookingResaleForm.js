import { Button, Price } from '@kaboodle-solutions/design-system';
import { RESALABLE, RESALE_ENABLED } from '../../constants';
import React, { PureComponent } from 'react';

import BookingResaleModal from '../BookingResaleModal';
import PropTypes from 'prop-types';
import ResaleItem from '../ResaleItem';
import styles from './BookingResaleForm.styles';
import withStyles from 'react-jss';

class BookingResaleForm extends PureComponent {
  state = {
    editable: false,
    modifications: [],
    showModal: false,
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    resaleValue: PropTypes.number,
    tickets: PropTypes.array.isRequired,
  };

  static defaultProps = {
    resaleValue: 0,
  };

  toggleTicketStatus = id => {
    const originalStatus = this.props.tickets.find(ticket => ticket.id === id)
      .resale;
    const newStatus =
      this.getTicketStatus(id) === RESALE_ENABLED ? RESALABLE : RESALE_ENABLED;

    const { modifications: currentModifications } = this.state;
    const newModifications = [...currentModifications];

    if (newStatus === originalStatus) {
      // If we're reverting to the original status, remove existing modification as we're not changing modifying anything.
      const ticketModificationIndex = currentModifications.findIndex(
        ticket => ticket.id === id,
      );
      newModifications.splice(ticketModificationIndex, 1);
    } else {
      // If it's a new status, and there IS NOT an existing modification, push a new modification.
      newModifications.push({ id, status: newStatus });
    }

    this.setState({
      modifications: newModifications,
    });
  };

  getTicketModification = id =>
    this.state.modifications.find(ticket => ticket.id === id);

  getTicketStatus = id => {
    const ticketModification = this.getTicketModification(id);

    // If the ticket hasn't been modified, return the original status.
    if (ticketModification === undefined) {
      const unmodifiedTicket = this.props.tickets.find(
        ticket => ticket.id === id,
      );
      return unmodifiedTicket.resale;
    }
    return ticketModification.status;
  };

  getSelectionMessage = () => {
    const { tickets } = this.props;
    const { editable } = this.state;

    // Retrieve tickets IDs for items that are onsale based on existing status' and current selection.
    const resaleTickets = tickets.reduce((count, ticket) => {
      const ticketModification = this.getTicketModification(ticket.id);
      if (
        (ticket.resale === RESALE_ENABLED &&
          ticketModification === undefined) ||
        (ticketModification && ticketModification.status === RESALE_ENABLED)
      ) {
        return count + 1;
      }
      return count;
    }, 0);

    const selectionMode = editable ? 'selected' : 'listed';

    // Show what's selected for resale, as well as what was originally on resale.
    if (resaleTickets > 1) {
      return `You've ${selectionMode} ${resaleTickets} tickets for resale.`;
    } else if (resaleTickets) {
      return `You've ${selectionMode} ${resaleTickets} ticket for resale.`;
    }
    return `You haven't ${selectionMode} any tickets for resale.`;
  };

  handleClearSelection = () =>
    this.setState({ editable: false, modifications: [] });

  handleOnSubmit = () => {
    this.props.onChange(this.state.modifications);
    this.handleClearSelection();
  };

  render() {
    const { classes, tickets, resaleValue } = this.props;
    const { editable, showModal, modifications } = this.state;

    const hasModifications = modifications.length > 0;
    const isModifiable = tickets.some(({ resale }) =>
      [RESALABLE, RESALE_ENABLED].includes(resale),
    );

    return (
      <div className={classes.container}>
        <div className={classes.selection}>{this.getSelectionMessage()}</div>
        <div className={classes.form}>
          {tickets.map(({ id, name, prices, pax, barcode }) => (
            <ResaleItem
              key={id}
              title={name}
              customer={pax}
              barcode={barcode}
              type="tickets"
              status={this.getTicketStatus(id)}
              editable={editable}
              price={prices.price.value}
              onChange={() => this.toggleTicketStatus(id)}
            />
          ))}
        </div>
        <div className={classes.footer}>
          {!editable && (
            <div className={classes.summary}>
              {resaleValue > 0 && (
                <div className={classes.resalePrice}>
                  <Price label="Total on Resale:" value={resaleValue} />
                </div>
              )}
            </div>
          )}
          <div className={classes.actions}>
            {editable && (
              <>
                <Button onClick={this.handleClearSelection}>Cancel</Button>
                <Button
                  variant="success"
                  disabled={!hasModifications}
                  onClick={() => this.setState({ showModal: true })}>
                  Save Changes
                </Button>
              </>
            )}
            {!editable && isModifiable && (
              <Button
                onClick={() => this.setState({ editable: true })}
                type="success">
                Edit Resale
              </Button>
            )}
          </div>
        </div>
        {showModal && (
          <BookingResaleModal
            tickets={tickets}
            modifications={modifications}
            onSubmit={this.handleOnSubmit}
            onDismiss={() => this.setState({ showModal: false })}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(BookingResaleForm);
