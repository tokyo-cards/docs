import axios from 'axios';

const getAuthorId = async (TOKEN) => {
  const url = 'https://api.medium.com/v1/me';
  const headers = { Authorization: `Bearer ${TOKEN}` };
  const { data } = await axios({
    method: 'get',
    url,
    headers,
  });

  return data.data.id;
};

export {
  // eslint-disable-next-line import/prefer-default-export
  getAuthorId,
};
