import { formatDate } from '@/lib/utils-custom'

interface ChatMessageProps {
  id: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: Date
  isCurrentUser?: boolean
}

export function ChatMessage({
  senderName,
  senderAvatar,
  content,
  timestamp,
  isCurrentUser = false,
}: ChatMessageProps) {
  return (
    <div
      className={`
        flex gap-3 mb-4 
        ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}
      `}
    >
      {/* Avatar */}
      <div
        className={`
          w-10 h-10 rounded-none border-2 border-black flex-shrink-0
          ${isCurrentUser ? 'bg-green-300' : 'bg-blue-300'}
          flex items-center justify-center font-bold text-xs
        `}
      >
        {senderAvatar}
      </div>

      {/* Message Bubble */}
      <div
        className={`
          flex flex-col gap-1 flex-1
          ${isCurrentUser ? 'items-end' : 'items-start'}
        `}
      >
        {/* Sender Name & Time */}
        <div className="flex gap-2 text-xs font-bold text-gray-700">
          <span>{senderName}</span>
          <span className="text-gray-500">
            {timestamp.toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        {/* Message Content */}
        <div
          className={`
            px-4 py-2 border-3 border-black
            ${
              isCurrentUser
                ? 'bg-green-200 rounded-bl-none'
                : 'bg-yellow-100 rounded-br-none'
            }
            max-w-xs break-words
            shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
          `}
        >
          <p className="text-sm font-medium text-black">{content}</p>
        </div>
      </div>
    </div>
  )
}
