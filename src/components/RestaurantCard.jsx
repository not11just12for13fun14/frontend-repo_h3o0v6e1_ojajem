function RestaurantCard({ restaurant, onView }) {
  return (
    <button onClick={() => onView(restaurant)} className="group text-left w-full bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition overflow-hidden">
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img src={restaurant.image_url || 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop'} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
          <span className="text-sm px-2 py-1 rounded-md bg-green-100 text-green-700 font-medium">{restaurant.rating.toFixed(1)} ★</span>
        </div>
        <div className="mt-1 text-sm text-gray-600">{restaurant.cuisine} • {restaurant.delivery_time_min} min • ${restaurant.delivery_fee.toFixed(2)} fee</div>
      </div>
    </button>
  )
}

export default RestaurantCard
