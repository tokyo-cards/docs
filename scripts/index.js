/* eslint-disable no-console */
import dree from 'dree';
import { readFile } from 'fs/promises';
import JSONdb from 'simple-json-db';

// eslint-disable-next-line import/extensions
import { markdownToHtml } from './lib/index.js';
// eslint-disable-next-line import/extensions
import { getAuthorId } from './lib/getAuthorId/index.js';
// eslint-disable-next-line import/extensions
import { publish } from './lib/publish/index.js';

const options = {
  depth: 6,
  size: true,
  hash: true,
  exclude: /scripts|node_modules|.git/g,
  extensions: ['md'],
};

const db = new JSONdb('./db.json');
// eslint-disable-next-line no-unused-vars
let AUTHOR_ID;

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
      await publish(data, content, db, file, AUTHOR_ID);
    }
  } else {
    const entry = db.get(file.relativePath);
    if (Object.keys(data).length > 0) {
      if (entry.status === 'draft'
        || entry.status === 'ready') {
        entry.status = 'ready';
        await publish(data, content, db, file, AUTHOR_ID);
      }
    }
    db.set(file.relativePath, entry);
  }
};

const main = async () => {
  AUTHOR_ID = await getAuthorId();
  // eslint-disable-next-line no-unused-vars
  const tree = await dree.scanAsync('./', options, action);
  db.sync();
};

main();
