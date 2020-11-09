import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { createPortal } from 'react-dom';

class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.modalRoot = document.getElementById('modal-root');
    this.container = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.container);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.container);
  }

  render() {
    return createPortal(this.props.children, this.container);
  }
}

Modal.propTypes = {
  children: PropTypes.any,
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
