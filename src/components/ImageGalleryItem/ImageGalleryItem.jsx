import PropTypes from 'prop-types';
import { Img, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ srcUrl, description, onSelect }) => {
  return (
    <Item onClick={onSelect}>
      <Img src={srcUrl} alt={description} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  srcUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
