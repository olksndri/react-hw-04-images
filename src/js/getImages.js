import axios from 'axios';

const prefs = {
  baseUrl: 'https://pixabay.com/api/',
  key: '36627448-7990d21daa2cb7c713fa88e55',
};

const getImages = async (input, page) => {
  const response = await axios.get(
    `${prefs.baseUrl}?key=${prefs.key}&q=${input}&orientation=horizontal&image_type=photo&page=${page}&per_page=12`
  );
  return response.data.hits;
};

export { getImages };
