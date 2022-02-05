import dree from 'dree';
// import { markdownToHtml } from './lib/markdown';

const options = {
  stat: false,
  normalize: true,
  followLinks: true,
  size: true,
  hash: true,
  depth: 5,
  exclude: /scripts|node_modules|.git/g,
  extensions: ['md'],
};

const tree = dree.scan('./', options);

// eslint-disable-next-line no-console
console.log(tree);
