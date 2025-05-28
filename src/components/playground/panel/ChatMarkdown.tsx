import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { cn } from '@/lib/utils'

interface ChatMarkdownProps {
  content: string
}

interface CodeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const components: Components = {
  code: ({ inline, className, children, ...props }: CodeProps) => (
    <code
      className={cn(
        "rounded-lg px-1.5 py-1",
        inline ? "bg-gray-200" : "block bg-gray-200 p-4",
        className
      )}
      {...props}
    >
      {children}
    </code>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  a: ({ children, ...props }) => (
    <a
      className="text-blue-600 hover:text-blue-800 underline"
      {...props}
    >
      {children}
    </a>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  p: ({ children, ...props }) => (
    <p
      className="mb-4 last:mb-0"
      {...props}
    >
      {children}
    </p>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ul: ({ children, ...props }) => (
    <ul
      className="list-disc list-inside mb-4 last:mb-0"
      {...props}
    >
      {children}
    </ul>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal list-inside mb-4 last:mb-0"
      {...props}
    >
      {children}
    </ol>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  li: ({ children, ...props }) => (
    <li
      className="mb-1 last:mb-0"
      {...props}
    >
      {children}
    </li>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h1: ({ children, ...props }) => (
    <h1
      className="text-2xl font-bold mb-4 last:mb-0"
      {...props}
    >
      {children}
    </h1>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h2: ({ children, ...props }) => (
    <h2
      className="text-xl font-bold mb-4 last:mb-0"
      {...props}
    >
      {children}
    </h2>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h3: ({ children, ...props }) => (
    <h3
      className="text-lg font-bold mb-4 last:mb-0"
      {...props}
    >
      {children}
    </h3>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h4: ({ children, ...props }) => (
    <h4
      className="text-base font-bold mb-4 last:mb-0"
      {...props}
    >
      {children}
    </h4>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h5: ({ children, ...props }) => (
    <h5
      className="text-sm font-bold mb-4 last:mb-0"
      {...props}
    >
      {children}
    </h5>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h6: ({ children, ...props }) => (
    <h6
      className="text-xs font-bold mb-4 last:mb-0"
      {...props}
    >
      {children}
    </h6>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic mb-4 last:mb-0"
      {...props}
    >
      {children}
    </blockquote>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hr: ({ ...props }) => (
    <hr
      className="my-4 border-gray-300"
      {...props}
    />
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  table: ({ children, ...props }) => (
    <table
      className="border-collapse border border-gray-300 mb-4 last:mb-0"
      {...props}
    >
      {children}
    </table>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  th: ({ children, ...props }) => (
    <th
      className="border border-gray-300 px-4 py-2 bg-gray-100"
      {...props}
    >
      {children}
    </th>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  td: ({ children, ...props }) => (
    <td
      className="border border-gray-300 px-4 py-2"
      {...props}
    >
      {children}
    </td>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tr: ({ children, ...props }) => (
    <tr
      className="hover:bg-gray-50"
      {...props}
    >
      {children}
    </tr>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pre: ({ children, ...props }) => (
    <pre
      className="bg-gray-100 p-4 rounded-lg mb-4 last:mb-0 overflow-x-auto"
      {...props}
    >
      {children}
    </pre>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt}
      className="max-w-full h-auto rounded-lg mb-4 last:mb-0"
      {...props}
    />
  ),
}

export function ChatMarkdown({ content }: ChatMarkdownProps) {
  return (
    <ReactMarkdown
      components={components}
    >
      {content}
    </ReactMarkdown>
  )
} 