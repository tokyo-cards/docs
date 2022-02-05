/* eslint-disable no-console */
import dree from 'dree';
import { readFile } from 'fs/promises';
import JSONdb from 'simple-json-db';
import axios from 'axios';

// eslint-disable-next-line import/extensions
import { markdownToHtml } from './lib/index.js';

const options = {
  depth: 5,
  size: true,
  hash: true,
  exclude: /scripts|node_modules|.git/g,
  extensions: ['md'],
};

const db = new JSONdb('./db.json');
// eslint-disable-next-line no-unused-vars
let AUTHOR_ID;
const { TOKEN } = process.env;

const getAuthorId = async () => {
  const url = 'https://api.medium.com/v1/me';
  const headers = { Authorization: `Bearer ${TOKEN}` };
  return axios({
    method: 'get',
    url,
    headers,
  });
};

const publish = async (rawData, content) => {
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

  return axios({
    method: 'post',
    url,
    headers,
    data,
  });
};

// Do something with each file
const action = async (file) => {
  const raw = await readFile(file.relativePath, 'utf8');
  const [data, content] = await markdownToHtml(raw);
  if (!db.has(file.relativePath)) {
    if (Object.keys(data).length === 0) {
      // mark as draft
      db.set(file.relativePath, { status: 'draft' });
    } else {
      // ready to publish
      db.set(file.relativePath, { status: 'ready' });
      const res = await publish(data, content);
      if ([200, 201].includes(res.status)) {
        db.set(file.relativePath, {
          status: 'published',
          hash: file.hash,
        });
      }
    }
  } else {
    const entry = db.get(file.relativePath);
    if (file.hash !== entry.hash
      && entry.status === 'published') {
      // mark as update
      entry.status = 'update';
      db.set(file.relativePath, entry);
    }
  }
};

const main = async () => {
  const { data } = await getAuthorId();
  AUTHOR_ID = data.data.id;
  // eslint-disable-next-line no-unused-vars
  const tree = dree.scan('./', options, action);
  db.sync();
};

main();
