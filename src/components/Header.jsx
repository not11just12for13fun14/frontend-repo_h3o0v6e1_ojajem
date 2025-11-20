import { useState } from 'react'

function Header({ onSeed, seeding, backendUrl }) {
  const [copied, setCopied] = useState(false)

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(backendUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 text-white font-bold shadow">
            FD
          </span>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">FoodDash</h1>
            <p className="text-xs text-gray-500">Delivering happiness, fast</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyUrl} className="hidden sm:inline-flex text-xs px-3 py-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">
            {copied ? 'Copied backend URL' : 'Copy backend URL'}
          </button>
          <button onClick={onSeed} disabled={seeding} className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black disabled:opacity-60">
            {seeding ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full" />
                Seeding...
              </>
            ) : (
              'Load sample restaurants'
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
