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
    h4: ({ node, ...props }) => (
      <h4 className="text-base font-semibold text-foreground mt-3 mb-2" {...props} />
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
    ol: ({ node, ...props }) => (
      <ol className="space-y-2 mb-4 ml-6 list-decimal" {...props} />
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

    // Add proper table styling
    table: ({ node, ...props }) => (
      <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-full divide-y divide-border" {...props} />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead className="bg-muted" {...props} />
    ),
    tbody: ({ node, ...props }) => (
      <tbody className="divide-y divide-border bg-card" {...props} />
    ),
    tr: ({ node, ...props }) => (
      <tr className="divide-x divide-border" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th className="px-4 py-3.5 text-left text-sm font-semibold text-foreground" {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className="px-4 py-3 text-sm text-muted-foreground" {...props} />
    ),

    // Code blocks
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline ? (
        <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4">
          <code
            className={`${match ? `language-${match[1]}` : ''} text-sm font-mono text-foreground`}
            {...props}
          >
            {children}
          </code>
        </pre>
      ) : (
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground" {...props}>
          {children}
        </code>
      );
    },

    // Links
    a: ({ node, ...props }) => (
      <a
        className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary/100 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),

    // Block quotes
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-primary/40 pl-4 my-4 italic text-muted-foreground" {...props} />
    ),

    // Horizontal rules
    hr: ({ node, ...props }) => (
      <hr className="my-6 border-t border-border" {...props} />
    ),
  };

  return (
    <div className="prose-custom">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={MarkdownComponents}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default MarkdownRender;
