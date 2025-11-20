import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import RestaurantCard from './components/RestaurantCard'
import RestaurantModal from './components/RestaurantModal'
import Cart from './components/Cart'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [loading, setLoading] = useState(true)
  const [restaurants, setRestaurants] = useState([])
  const [selected, setSelected] = useState(null)
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState([])
  const [seeding, setSeeding] = useState(false)

  const fetchRestaurants = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${baseUrl}/restaurants`)
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setRestaurants(data)
    } catch (e) {
      setRestaurants([])
    } finally {
      setLoading(false)
    }
  }

  const viewRestaurant = async (r) => {
    setSelected(r)
    try {
      const res = await fetch(`${baseUrl}/restaurants/${r.id}/menu`)
      const data = await res.json()
      setMenu(data)
    } catch (e) {
      setMenu([])
    }
  }

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const clearCart = () => setCart([])

  const seed = async () => {
    try {
      setSeeding(true)
      await fetch(`${baseUrl}/seed`, { method: 'POST' })
      await fetchRestaurants()
    } finally {
      setSeeding(false)
    }
  }

  useEffect(() => { fetchRestaurants() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50">
      <Header onSeed={seed} seeding={seeding} backendUrl={baseUrl} />
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Popular near you</h2>
          <a href="/test" className="text-sm text-gray-600 hover:text-gray-900">Check connection</a>
        </div>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-2xl border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : restaurants.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
            <div className="text-gray-700 font-medium">No restaurants yet</div>
            <div className="text-sm text-gray-500 mt-1">Click the button above to load sample data</div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map(r => (
              <RestaurantCard key={r.id} restaurant={r} onView={viewRestaurant} />)
            )}
          </div>
        )}
      </section>

      {selected && (
        <RestaurantModal restaurant={selected} menu={menu} onClose={() => setSelected(null)} onAdd={addToCart} />
      )}

      {cart.length > 0 && (
        <Cart items={cart} onClear={clearCart} />
      )}

      <footer className="py-12 text-center text-sm text-gray-500">© {new Date().getFullYear()} FoodDash — Built for demo</footer>
    </div>
  )
}

export default App
