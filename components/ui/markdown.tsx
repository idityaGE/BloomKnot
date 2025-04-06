import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"


import React from 'react'

const MarkdownRender = ({ content }: { content: string }) => {
  const MarkdownComponents: Record<string, React.ComponentType<any>> = {
    h1: ({ node, ...props }) => (
      <h1 className="text-2xl font-bold text-foreground mt-6 mb-4" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-xl font-bold text-foreground mt-5 mb-3" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-lg font-semibold text-primary mt-4 mb-2" {...props} />
    ),

    // Custom paragraph with proper spacing
    p: ({ node, ...props }) => (
      <p className="text-muted-foreground mb-4 leading-relaxed" {...props} />
    ),

    // Enhance strong text
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),

    // Better list styling with custom bullets
    ul: ({ node, ...props }) => (
      <ul className="space-y-2 mb-4 ml-1" {...props} />
    ),
    li: ({ node, children, ...props }) => (
      <li className="flex items-start gap-2 text-muted-foreground">
        <span className="text-primary mt-1">•</span>
        <span>{children}</span>
      </li>
    ),

    // Handle emoji sections specially
    em: ({ node, children }) => {
      // Check if the content is likely an emoji section header
      if (typeof children === 'string' && children.includes('🔹')) {
        return <div className="text-primary font-medium mt-4 mb-2">{children}</div>;
      }
      return <em className="italic text-muted-foreground">{children}</em>;
    },
  };


  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={MarkdownComponents}
    >
      {content}
    </Markdown>
  )
}

export default MarkdownRender
