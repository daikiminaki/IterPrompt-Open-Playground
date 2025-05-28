import { Session } from "@/lib/core/IModel"
import { providerLogo } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useRef } from 'react'
import { ChatMarkdown } from "./ChatMarkdown"

interface MessageGroup {
  role: 'user' | 'assistant' | 'system' | 'data'  
  messages: { id: string; content: string }[]
}

function groupMessages(messages: Session['messages']): MessageGroup[] {
  return messages.reduce<MessageGroup[]>((groups, message) => {
    const lastGroup = groups[groups.length - 1]
    if (lastGroup && lastGroup.role === message.role) {
      lastGroup.messages.push({ id: message.id, content: message.content })
    } else {
      groups.push({
        role: message.role,
        messages: [{ id: message.id, content: message.content }]
      })
    }
    return groups
  }, [])
}

export function PanelChat({ session, loading }: { session: Session; loading?: boolean }) {
  const messageGroups = groupMessages(session.messages)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messageGroups.length > 0) {
      const lastUserGroup = [...messageGroups].reverse().find(group => group.role === 'user')
      if (lastUserGroup) {
        const element = document.getElementById(`message-${lastUserGroup.messages[0].id}`)
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [session.messages])

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {messageGroups.map((group, groupIndex) => (
          <div
            key={group.messages[0].id}
            id={`message-${group.messages[0].id}`}
            className={cn(
              "flex gap-3",
              group.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {group.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium">
                <Image
                  src={providerLogo[session.model.provider as keyof typeof providerLogo]} 
                  alt={session.model.provider} 
                  width={16}
                  height={16}
                />
              </div>
            )}
            <div className="flex flex-col gap-2 max-w-[80%]">
              {group.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "rounded-lg px-4",
                    group.role === 'user'
                      ? 'bg-blue-500 text-white py-2'
                      : 'bg-gray-100 text-gray-900 py-4'
                  )}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    <ChatMarkdown content={message.content} />
                  </div>
                </div>
              ))}
            </div>
            {group.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-medium text-white">
                U
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium">
              <Image
                src={providerLogo[session.model.provider as keyof typeof providerLogo]} 
                alt={session.model.provider} 
                width={16}
                height={16}
              />
            </div>
            <div className="flex flex-col gap-2 max-w-[80%]">
              <div className="rounded-lg px-4 py-2 bg-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
