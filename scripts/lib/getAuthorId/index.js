import axios from 'axios';

const { MEDIUM_TOKEN } = process.env;

const getAuthorId = async () => {
  const url = 'https://api.medium.com/v1/me';
  const headers = { Authorization: `Bearer ${MEDIUM_TOKEN}` };
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
