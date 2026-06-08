import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import { NeoButton } from './NeoButton'
import { Lock, Send } from 'lucide-react'

interface Message {
  id: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: Date
}

interface EventGroupChatProps {
  eventTitle: string
  participantStatus?: 'accepted' | 'pending' | 'rejected' | 'waitlist'
  isCreator?: boolean
}

export function EventGroupChat({
  eventTitle,
  participantStatus = 'pending',
  isCreator = false,
}: EventGroupChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderName: 'Rina Maulana',
      senderAvatar: 'RM',
      content: 'Guys, siapa yang ready besok Main ML tournament?',
      timestamp: new Date(Date.now() - 15 * 60000),
    },
    {
      id: '2',
      senderName: 'Budi Santoso',
      senderAvatar: 'BS',
      content: 'Siap! Aku main gold rank. Temen aku juga udah confirm',
      timestamp: new Date(Date.now() - 12 * 60000),
    },
    {
      id: '3',
      senderName: 'Siti Nurhaliza',
      senderAvatar: 'SN',
      content: 'Lokasi pasti di mall Alam Sutera kan? Jam berapa kita meet up?',
      timestamp: new Date(Date.now() - 8 * 60000),
    },
    {
      id: '4',
      senderName: 'Rina Maulana',
      senderAvatar: 'RM',
      content: 'Iya, jam 5 sore di food court. Kita makan dulu sebelum main',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
  ])

  const [newMessage, setNewMessage] = useState('')
  const [currentUser] = useState({
    name: 'You',
    avatar: 'YO',
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const isLocked = participantStatus !== 'accepted' && !isCreator
  const canChat = !isLocked

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {/* Chat Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b-4 border-black bg-blue-300 px-6 py-4 flex-shrink-0">
        <h3 className="text-xl font-black">{eventTitle} - Group Chat</h3>
        {isCreator && (
          <span className="px-3 py-1 bg-green-300 border-2 border-black font-bold text-xs">
            CREATOR
          </span>
        )}
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 relative"
      >
        {/* Locked Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-none border-4 border-black">
            <div className="bg-white border-4 border-black p-6 text-center max-w-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Lock size={48} className="mx-auto mb-4 text-red-500 font-black" />
              <h4 className="text-xl font-black mb-3 text-black">
                Chat Terkunci
              </h4>
              <p className="text-sm font-bold text-gray-700 leading-relaxed">
                Group Chat hanya dapat diakses setelah status RSVP disetujui
                (ACC).
              </p>
              <div className="mt-4 text-xs font-bold text-gray-600">
                Status Anda: <span className="text-yellow-600">PENDING</span>
              </div>
            </div>
          </div>
        )}

        {/* Messages List */}
        <div>
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 font-bold py-8">
              Tidak ada pesan. Mulai percakapan sekarang!
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                {...message}
                isCurrentUser={message.senderName === currentUser.name}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Only visible when unlocked */}
      {canChat && (
        <div className="sticky bottom-0 z-10 border-t-4 border-black bg-white px-6 py-4 flex-shrink-0 flex gap-2">
          <input
            type="text"
            placeholder="Ketik pesan..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 border-3 border-black font-bold text-sm focus:outline-none focus:bg-yellow-50"
            disabled={isLocked}
          />
          <NeoButton
            variant="primary"
            size="sm"
            onClick={handleSendMessage}
            disabled={isLocked || !newMessage.trim()}
            className="flex items-center gap-2"
          >
            <Send size={18} />
            <span className="hidden sm:inline">Kirim</span>
          </NeoButton>
        </div>
      )}

      {/* Locked State - Input Disabled Message */}
      {isLocked && (
        <div className="border-t-4 border-black bg-red-100 px-6 py-3 text-center flex-shrink-0">
          <p className="text-xs font-bold text-red-700">
            Chat tidak tersedia. Tunggu persetujuan admin.
          </p>
        </div>
      )}
    </div>
  )
}
