function SiteHeader({ onSeed, seeding, onCreate, onSwitch, me, eur }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold shadow">CJ</span>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Chatjob</h1>
            <p className="text-xs text-gray-500">UK chatting • Paid in euros</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onSeed} disabled={seeding} className="hidden sm:inline-flex text-xs px-3 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-60">{seeding ? 'Seeding…' : 'Load sample creators'}</button>
          <button onClick={onCreate} className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black">Create account</button>
          <button onClick={onSwitch} className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">
            {me ? `${me.name} • €${eur(me.wallet_eur)}` : 'Switch user'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
