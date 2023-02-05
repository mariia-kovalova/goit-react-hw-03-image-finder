import { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { Container } from './Search.styled';
import { ImageGallery } from 'components/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Search extends Component {
  state = { page: 1, query: '', url: '' };

  handleSubmit = query => {
    this.setState({ query, page: 1 });
  };

  closeModal = () => {
    this.setState({
      url: '',
    });
  };

  selectImg = url => {
    this.setState({ url });
  };

  render() {
    const { page, query, url } = this.state;
    const showModal = url.length > 0;
    return (
      <>
        <Container>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} query={query} onSelect={this.selectImg} />
          {showModal && (
            <Modal onCloseModal={this.closeModal}>
              <img src={url} alt="modal window" />
            </Modal>
          )}
        </Container>
        <ToastContainer autoClose={2500} />
      </>
    );
  }
}
