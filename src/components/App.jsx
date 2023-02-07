import { Component } from 'react';
import { getPhotos } from 'utils';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal/Modal';
import { Container, End } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    total: 0,
    isLoading: false,
    items: [],
    error: null,
    url: '',
  };

  componentDidUpdate(_, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query: nextQuery, page: nextPage } = this.state;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.getItems();
    }
  }

  handleSubmit = query => {
    if (query === this.state.query) return;
    this.setState({
      query,
      page: 1,
      items: [],
      error: null,
    });
  };

  getItems = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const { hits: moreItems, totalHits: total } = await getPhotos(
        query,
        page
      );
      this.setState(({ items }) => ({
        items: [...items, ...moreItems],
        total,
      }));

      if (total === 0) {
        this.notify(query);
      }
    } catch (error) {
      this.setState({ error });
      this.errorInfo(error.message);
    } finally {
      this.setState({ isLoading: false }, () => {
        if (page !== 1) {
          this.scroll();
        }
      });
    }
  };

  closeModal = () => {
    this.setState({
      url: '',
    });
  };

  selectImg = url => {
    this.setState({ url });
  };

  notify = message => {
    toast.warning(`Oops, "${message}" pictures were not found.`);
  };

  errorInfo = message => {
    toast.error(`Oops, something went wrong: ${message}`);
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  scroll = () => {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    //  window.scrollTo({
    //    top: document.documentElement.scrollHeight,
    //    behavior: 'smooth',
    //  });
  };

  render() {
    const { page, total, items, isLoading, error, url } = this.state;
    const showLoadMore = page < Math.ceil(total / 12);
    const end = !(page < Math.ceil(total / 12)) && items.length > 0;
    const showModal = url.length > 0;

    return (
      <>
        <Container>
          <Searchbar onSubmit={this.handleSubmit} />

          <ImageGallery items={items} onSelect={this.selectImg} />
          {isLoading && <Loader />}
          {showLoadMore && (
            <Button onClick={this.loadMore} type="button">
              Load more
            </Button>
          )}
          {end && <End>End of content</End>}
          {error && <End>Error</End>}
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
