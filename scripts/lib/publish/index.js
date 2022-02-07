/* eslint-disable no-console */
import axios from 'axios';
import Twitter from 'twitter';

const publish = async (rawData, content, _db, file, AUTHOR_ID) => {
  const { MEDIUM_TOKEN, IS_PR } = process.env;
  if (IS_PR === 'false') {
    console.log("It's a Merge posting ...");

    const client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    const url = `https://api.medium.com/v1/users/${AUTHOR_ID}/posts`;
    const tags = rawData.tags ? rawData.tags : [];
    const headers = {
      Authorization: `Bearer ${MEDIUM_TOKEN}`,
      'Content-Type': 'application/json',
    };
    const data = {
      title: rawData.title,
      publishStatus: 'public',
      contentFormat: 'html',
      tags,
      content,
    };

    const res = await axios({
      method: 'post',
      url,
      headers,
      data,
    });

    if ([200, 201].includes(res.status)) {
      const { respUrl } = res.data;
      try {
        await client.post(
          'statuses/update',
          { status: `We have posted a new article on Medium, check it out ! ${respUrl}` },
        );
      } catch (e) {
        console.log(e);
      }
      _db.set(file.relativePath, {
        status: 'published',
        hash: file.hash,
      });
    }
  } else {
    console.log('PR skip post ....');
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  publish,
};
