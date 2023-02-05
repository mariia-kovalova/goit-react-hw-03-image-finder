import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalStyled, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    onCloseModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = ({ currentTarget, target }) => {
    if (currentTarget !== target) {
      return;
    }
    this.props.onCloseModal();
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalStyled>{this.props.children}</ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}
