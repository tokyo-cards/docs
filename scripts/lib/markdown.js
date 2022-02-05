import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import remarkDirective from 'remark-directive';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import * as matter from 'gray-matter';
import { visit } from 'unist-util-visit';

function itemPlugin() {
  // eslint-disable-next-line no-unused-vars
  return (tree, file) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective'
        || node.type === 'leafDirective'
        || node.type === 'containerDirective'
      ) {
        if (node.name !== 'item') return;
        // eslint-disable-next-line no-param-reassign
        const data = node.data || (node.data = {});
        const text = node.children[0].value;

        // eslint-disable-next-line no-param-reassign
        node.children[0].value = `[${text}]`;
        const {
          id,
          // eslint-disable-next-line camelcase
          asset_type,
          rarity,
          lang,
        } = node.attributes;
        data.hName = 'a';
        data.hProperties = {
          // eslint-disable-next-line camelcase
          href: `/items/?id=${id}&asset_type=${asset_type}&lang=${lang}`,
          class: `item-${rarity}`,
        };
      }
    });
  };
}

const markdownToHtml = async (markdown) => {
  const processed = matter(markdown);
  const res = await unified()
    .use(rehypeAutolinkHeadings)
    .use(remarkDirective)
    .use(itemPlugin)
    .use(remarkGfm)
    .use(remarkRehype)
    .data('settings', { fragment: true })
    .use(remarkParse)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(processed.content);
  return [processed.data, res.toString()];
};

export {
  // eslint-disable-next-line import/prefer-default-export
  markdownToHtml,
};
