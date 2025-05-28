import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

interface ChatMarkdownProps {
  content: string
}

const components: Components = {
  code: ({ inline, className, children, ...props }: any) => (
    <code
      className={cn(
        "rounded-lg px-1.5 py-1",
        inline ? "bg-gray-200" : "block bg-gray-200 p-4"
      )}
      {...props}
    >
      {children}
    </code>
  ),
  a: ({ children, ...props }) => (
    <a
      className="text-blue-500 hover:underline"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-4" {...props}>
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-gray-200 pl-4 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto">
      <table className="border-collapse border border-gray-200" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="border border-gray-200 px-4 py-2 bg-gray-50" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-gray-200 px-4 py-2" {...props}>
      {children}
    </td>
  ),
  p: ({ children, ...props }) => (
    <p className="leading-none" {...props}>
      {children}
    </p>
  ),
  h1: ({ children, ...props }) => (
    <h1 className="text-2xl font-bold mt-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-xl font-bold mt-4" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-lg font-bold mt-3" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-base font-bold mt-3" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="text-sm font-bold mt-2" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="text-xs font-bold mt-2" {...props}>
      {children}
    </h6>
  )
}

export function ChatMarkdown({ content }: ChatMarkdownProps) {
  return (
    <div className="space-y-0.5">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
} 