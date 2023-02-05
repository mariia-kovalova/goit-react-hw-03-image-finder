import { Component } from 'react';
import PropTypes from 'prop-types';
import { getPhotos } from 'utils';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Loader } from 'components/Loader';
import { toast } from 'react-toastify';
import { End, GalleryList } from './ImageGallery.styled';
import { Button } from 'components/Button';

const INITIAL_VALUES = {
  items: [],
  error: null,
  status: 'idle',
  total: 0,
};

export class ImageGallery extends Component {
  static defaultProps = {
    query: '',
    page: 1,
  };

  static propTypes = {
    page: PropTypes.number,
    query: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
  };

  state = { page: this.props.page, ...INITIAL_VALUES };

  async componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ ...INITIAL_VALUES, status: 'pending' });
      try {
        const { hits: items, totalHits: total } = await getPhotos(
          nextQuery,
          nextPage
        );
        this.setState({
          items,
          status: 'resolved',
          total,
        });

        if (items.length === 0) this.notify(nextQuery);
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }

    if (prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      try {
        const { hits: moreItems, totalHits: total } = await getPhotos(
          nextQuery,
          nextPage
        );
        this.setState(({ items }) => ({
          items: [...items, ...moreItems],
          status: 'resolved',
          total,
        }));
        this.scrollOnLoadButton();
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  hasMorePhotos = () => {
    const { page, total } = this.state;
    return page < Math.ceil(total / 12);
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  notify = message => {
    toast.warning(`${message} pictures were not found.`);
  };

  render() {
    const { onSelect } = this.props;
    const { items, status } = this.state;
    const idle = status === 'idle';
    const pending = status === 'pending';
    const rejected = status === 'rejected';
    const resolved = items.length > 0 || status === 'resolved';
    const needToShowLoadMore = resolved && this.hasMorePhotos();
    const end = resolved && !this.hasMorePhotos();

    if (idle) return <></>;
    if (rejected) return <div>Error</div>;
    return (
      <>
        {resolved && (
          <GalleryList>
            {items.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                srcUrl={webformatURL}
                largeImageURL={largeImageURL}
                description={tags}
                onSelect={() => onSelect(largeImageURL)}
              />
            ))}
          </GalleryList>
        )}
        {pending && <Loader />}
        {needToShowLoadMore && (
          <Button onClick={this.loadMore} type="button">
            Load more
          </Button>
        )}
        {end && <End>End of content</End>}
      </>
    );
  }
}
