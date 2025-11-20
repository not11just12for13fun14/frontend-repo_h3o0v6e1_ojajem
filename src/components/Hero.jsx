function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-100 via-rose-50 to-amber-100" />
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8 sm:pt-16 sm:pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Fresh meals, delivered to your door
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore nearby restaurants and order in seconds. No calls, no hassle — just great food.
            </p>
            <div className="mt-6 flex gap-3">
              <input placeholder="Search cuisines, dishes..." className="w-full max-w-xs px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
              <button className="px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600">
                Search
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500">Free delivery on your first order</div>
          </div>
          <div className="relative">
            <img alt="Delicious food" className="rounded-2xl shadow-2xl w-full object-cover" src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1600&auto=format&fit=crop" />
            <div className="absolute -bottom-4 -left-4 bg-white shadow-xl rounded-xl p-4 hidden sm:flex items-center gap-3">
              <img className="w-12 h-12 rounded-lg object-cover" src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=300&auto=format&fit=crop" />
              <div>
                <div className="font-semibold">30 min avg</div>
                <div className="text-xs text-gray-500">Delivery time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
