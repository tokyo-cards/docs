import axios from 'axios';

const publish = async (rawData, content, _db, file, AUTHOR_ID) => {
  const { TOKEN, IS_PR } = process.env;
  if (!IS_PR) {
    const url = `https://api.medium.com/v1/users/${AUTHOR_ID}/posts`;
    const tags = rawData.tags ? rawData.tags : [];
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    };
    const data = {
      title: rawData.title,
      publishStatus: 'public',
      contentFormat: 'html',
      tags,
      content,
    };

    // const res = await axios({
    //   method: 'post',
    //   url,
    //   headers,
    //   data,
    // });

    // if ([200, 201].includes(res.status)) {
    //   _db.set(file.relativePath, {
    //     status: 'published',
    //     hash: file.hash,
    //   });
    // }
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  publish,
};
