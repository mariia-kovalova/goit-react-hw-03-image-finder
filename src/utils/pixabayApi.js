import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';
const API_KEY = '32612520-8855a8bf59320f9a880e30168';

export const getPhotos = async (q, page) => {
  const { data } = await axios.get('/api', {
    params: {
      q,
      key: API_KEY,
      page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return data;
};
