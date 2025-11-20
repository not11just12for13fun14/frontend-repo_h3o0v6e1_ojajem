function CreatorCard({ creator, onStart }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
        {creator.avatar_url ? (
          <img src={creator.avatar_url} alt={creator.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">💬</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{creator.name}</h3>
          <span className="text-sm font-medium text-indigo-600">€{creator.rate_eur_per_min}/min</span>
        </div>
        {creator.bio && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{creator.bio}</p>}
        <button onClick={() => onStart(creator)} className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black">
          Start chat
        </button>
      </div>
    </div>
  )
}

export default CreatorCard
