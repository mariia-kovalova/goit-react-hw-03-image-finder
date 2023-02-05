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

  async componentDidUpdate(_, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query: nextQuery, page: nextPage } = this.state;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ loading: true });
      try {
        const { hits: moreItems, totalHits: total } = await getPhotos(
          nextQuery,
          nextPage
        );
        this.setState(({ items }) => ({
          items: [...items, ...moreItems],
          total,
        }));

        if (total === 0) {
          this.notify(nextQuery);
        }

        if (nextPage !== 1) {
          this.scroll();
        }
      } catch (error) {
        this.setState({ error });
        this.errorInfo(error.message);
      } finally {
        this.setState({ loading: false });
      }
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
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { isLoading, page, total, items, error, url } = this.state;
    const showGallery = items.length > 0;
    const showLoadMore = page < Math.ceil(total / 12) && items.length > 0;
    const end = !(page < Math.ceil(total / 12)) && items.length > 0;
    const showModal = url.length > 0;

    return (
      <>
        <Container>
          <Searchbar onSubmit={this.handleSubmit} />
          {showGallery && (
            <ImageGallery items={items} onSelect={this.selectImg} />
          )}
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
