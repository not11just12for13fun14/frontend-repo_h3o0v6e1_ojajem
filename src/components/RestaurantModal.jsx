function RestaurantModal({ restaurant, menu, onClose, onAdd }) {
  if (!restaurant) return null
  return (
    <div className="fixed inset-0 z-30 flex items-end sm:items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img className="w-full h-48 object-cover" src={restaurant.image_url || 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop'} />
          <button onClick={onClose} className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-700 w-9 h-9 rounded-full shadow flex items-center justify-center">✕</button>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
              <div className="text-sm text-gray-600">{restaurant.cuisine} • {restaurant.delivery_time_min} min</div>
            </div>
            <div className="text-sm px-2 py-1 rounded-md bg-green-100 text-green-700 font-medium self-start">{restaurant.rating.toFixed(1)} ★</div>
          </div>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {menu.map(item => (
              <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex gap-3 p-3">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    {item.description && <div className="text-sm text-gray-600">{item.description}</div>}
                    <div className="mt-1 font-semibold">${item.price.toFixed(2)}</div>
                  </div>
                  <img className="w-20 h-20 object-cover rounded-lg" src={item.image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300&auto=format&fit=crop'} />
                </div>
                <div className="p-3 flex justify-end">
                  <button onClick={() => onAdd(item)} className="px-3 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600">Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantModal
