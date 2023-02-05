import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com//api';
const API_KEY = '32612520-8855a8bf59320f9a880e30168';

export const getPhotos = async (q, page) => {
  const { data } = await axios.get('/', {
    params: {
      key: API_KEY,
      q,
      page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return data;
};
