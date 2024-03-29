import { Box } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import './markdown.css';

async function markdownToHtml(markdown: string): Promise<string> {
    return (
        (
            await remark()
                .use(remarkParse)
                .use(remarkGfm)
                // Allow dangerous HTML, to be able to parse HTML inside markdown.
                // This is necessary because we want to use the same features as
                // GitHub does. The rehypeSanitize plugin ensures that the HTML stays
                // safe, by filtering dangerous tags out, such as script and iframe.
                .use(remarkRehype, { allowDangerousHtml: true })
                .use(rehypeRaw)
                .use(rehypeSanitize)
                .use(rehypeSlug)
                .use(rehypeAutolinkHeadings, {
                    properties: {
                        ariaHidden: 'true',
                        tabIndex: -1,
                        class: 'anchor',
                    },
                })
                .use(rehypeHighlight, {
                    detect: true,
                })
                .use(rehypeStringify)
                .process(markdown)
        ).toString()
    );
}

export function Markdown({ markdown }: { markdown: string }) {
    const [html, setHtml] = useState('');

    useEffect(() => {
        markdownToHtml(markdown)
            .then(setHtml)
            .catch(() => setHtml('kon de content niet goed inladen...'));
    }, [markdown]);

    return (
        <Box
            borderRadius={8}
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
            p={4}
            // eslint-disable-next-line react/no-danger
        />
    );
}
