"use client"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import Image from "next/image"
import Link from "next/link"

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => <strong className="font-bold text-white">{text}</strong>,
    [MARKS.ITALIC]: (text: any) => <em className="italic text-gray-300">{text}</em>,
    [MARKS.CODE]: (text: any) => (
      <code className="bg-gray-800 text-royal-blue px-2 py-1 rounded text-sm font-mono">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="text-gray-300 leading-relaxed mb-6">{children}</p>,
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="text-4xl font-bold text-white mb-8 mt-12">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-3xl font-bold text-white mb-6 mt-10">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal list-inside text-gray-300 mb-6 space-y-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li className="text-gray-300">{children}</li>,
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-royal-blue pl-6 py-4 my-8 bg-gray-800/50 rounded-r-lg">
        <div className="text-gray-300 italic">{children}</div>
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-gray-700 my-12" />,
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields
      return (
        <div className="my-8">
          <Image
            src={`https:${file.url}`}
            alt={title || "Blog image"}
            width={800}
            height={400}
            className="rounded-lg w-full h-auto"
          />
          {title && <p className="text-center text-gray-400 text-sm mt-2 italic">{title}</p>}
        </div>
      )
    },
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <Link
        href={node.data.uri}
        className="text-royal-blue hover:text-blue-400 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
  },
}

interface ContentfulRichTextProps {
  content: any
}

export default function ContentfulRichText({ content }: ContentfulRichTextProps) {
  if (!content) {
    return null
  }

  return <div className="prose prose-invert max-w-none">{documentToReactComponents(content, options)}</div>
}
