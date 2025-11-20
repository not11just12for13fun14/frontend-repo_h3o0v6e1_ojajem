import { useEffect, useRef, useState } from 'react'

function ChatWindow({ chat, me, onSend, messages, onEnd }) {
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-xl w-auto sm:w-[420px]">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Chatting with</div>
          <div className="font-semibold text-gray-900">{chat?.creator?.name}</div>
        </div>
        <button onClick={onEnd} className="text-sm text-red-600 hover:text-red-700">End chat</button>
      </div>
      <div className="p-4 max-h-80 overflow-y-auto space-y-2">
        {messages.map(m => (
          <div key={m.id || m.sent_at} className={`max-w-[80%] rounded-xl px-3 py-2 ${m.sender_id === me?.id ? 'bg-indigo-600 text-white ml-auto' : 'bg-gray-100 text-gray-900'}`}>
            <div className="text-xs opacity-75">{m.sender_id === me?.id ? 'You' : chat?.creator?.name}</div>
            <div className="text-sm">{m.content}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if(text.trim()) { onSend(text); setText('') } }} className="p-3 border-t border-gray-200 flex items-center gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Send</button>
      </form>
    </div>
  )
}

export default ChatWindow
