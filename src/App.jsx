import { useEffect, useMemo, useState } from 'react'
import SiteHeader from './components/SiteHeader'
import CreatorCard from './components/CreatorCard'
import ChatWindow from './components/ChatWindow'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [creators, setCreators] = useState([])
  const [seeding, setSeeding] = useState(false)
  const [me, setMe] = useState(null) // local user (customer)
  const [chat, setChat] = useState(null)
  const [messages, setMessages] = useState([])

  const eur = useMemo(() => (n) => Number(n || 0).toFixed(2), [])

  const seed = async () => {
    try {
      setSeeding(true)
      await fetch(`${baseUrl}/seed`, { method: 'POST' })
      await fetchCreators()
    } finally {
      setSeeding(false)
    }
  }

  const fetchCreators = async () => {
    try {
      const res = await fetch(`${baseUrl}/creators`)
      const data = await res.json()
      setCreators(data)
    } catch (e) {
      setCreators([])
    }
  }

  const createAccount = async () => {
    const name = prompt('Your name?') || 'Guest'
    // by default create a customer account
    const res = await fetch(`${baseUrl}/users`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, role: 'customer' }) })
    const data = await res.json()
    setMe({ id: data.user_id, ...data.user })
  }

  const switchUser = () => {
    setMe(null)
    setChat(null)
    setMessages([])
  }

  const ensureFunds = async () => {
    if (!me) return false
    if ((me.wallet_eur || 0) >= 3) return true
    const ok = confirm('Top up €5 to start chatting?')
    if (!ok) return false
    const res = await fetch(`${baseUrl}/wallet/topup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: me.id, amount_eur: 5 }) })
    const data = await res.json()
    setMe(prev => ({ ...prev, wallet_eur: data.wallet_eur }))
    return true
  }

  const startChat = async (creator) => {
    if (!me) {
      alert('Create an account first')
      return
    }
    const ok = await ensureFunds()
    if (!ok) return
    const res = await fetch(`${baseUrl}/chats`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ creator_id: creator.id, customer_id: me.id }) })
    const data = await res.json()
    setChat({ id: data.chat_id, ...data.chat, creator })
    setMessages([])
  }

  const loadMessages = async () => {
    if (!chat) return
    try {
      const res = await fetch(`${baseUrl}/chats/${chat.id}/messages`)
      const data = await res.json()
      setMessages(data)
    } catch {}
  }

  const sendMessage = async (text) => {
    if (!chat || !me) return
    await fetch(`${baseUrl}/chats/${chat.id}/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sender_id: me.id, content: text }) })
    await loadMessages()
  }

  const endChat = async () => {
    if (!chat) return
    const res = await fetch(`${baseUrl}/chats/${chat.id}/end`, { method: 'POST' })
    const data = await res.json()
    alert(`Chat ended. Duration: ${data.total_minutes} min, Cost: €${eur(data.total_cost_eur)}`)
    // update wallet
    const meRes = await fetch(`${baseUrl}/users/${me.id}`)
    const meData = await meRes.json()
    setMe(meData)
    setChat(null)
    setMessages([])
  }

  useEffect(() => { fetchCreators() }, [])
  useEffect(() => { const t = setInterval(loadMessages, 1500); return () => clearInterval(t) }, [chat?.id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <SiteHeader onSeed={seed} seeding={seeding} onCreate={createAccount} onSwitch={switchUser} me={me} eur={eur} />

      <section className="max-w-6xl mx-auto px-4 pt-10 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Chat, connect, and earn — in euros</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Creators set their per‑minute rate in EUR. Customers top up and start a private chat instantly. UK based, global reach.</p>
        </div>

        {creators.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
            <div className="text-gray-700 font-medium">No creators yet</div>
            <div className="text-sm text-gray-500 mt-1">Click the button above to load sample creators</div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map(c => (
              <CreatorCard key={c.id} creator={c} onStart={startChat} />
            ))}
          </div>
        )}
      </section>

      {chat && (
        <ChatWindow chat={chat} me={me} onSend={sendMessage} messages={messages} onEnd={endChat} />
      )}

      <footer className="py-12 text-center text-sm text-gray-500">© {new Date().getFullYear()} Chatjob — UK based • Paid in EUR</footer>
    </div>
  )
}

export default App
