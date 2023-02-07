import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ items, onSelect }) => {
  return (
    <GalleryList className="gallery">
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
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
