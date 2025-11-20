function Cart({ items, onClear }) {
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  return (
    <div className="fixed bottom-4 inset-x-0 flex justify-center z-30">
      <div className="bg-gray-900 text-white rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-4">
        <div className="text-sm">{items.length} item{items.length!==1?'s':''}</div>
        <div className="font-semibold">${total.toFixed(2)}</div>
        <button className="px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600">Checkout</button>
        <button onClick={onClear} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20">Clear</button>
      </div>
    </div>
  )
}

export default Cart
