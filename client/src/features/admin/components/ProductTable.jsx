export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <section className="glass-panel overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <h3 className="font-display font-semibold text-lg text-white">Product Catalog</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 font-display text-[9px] font-bold tracking-widest text-on-secondary-container uppercase">Product Name</th>
              <th className="px-6 py-4 font-display text-[9px] font-bold tracking-widest text-on-secondary-container uppercase">SKU</th>
              <th className="px-6 py-4 font-display text-[9px] font-bold tracking-widest text-on-secondary-container uppercase">Price</th>
              <th className="px-6 py-4 font-display text-[9px] font-bold tracking-widest text-on-secondary-container uppercase">Quantity</th>
              <th className="px-6 py-4 font-display text-[9px] font-bold tracking-widest text-on-secondary-container uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map(prod => (
              <tr key={prod._id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 glass-panel flex items-center justify-center overflow-hidden border-white/10 rounded flex-shrink-0 p-1">
                    {prod.images?.[0] ? (
                      <img className="max-w-full max-h-full object-contain" src={prod.images[0]} alt={prod.name} />
                    ) : (
                      <span className="material-symbols-outlined text-white/30 text-lg">image</span>
                    )}
                  </div>
                  <span className="font-bold text-white text-xs">{prod.name}</span>
                </td>
                <td className="px-6 py-4 font-display text-xs text-white opacity-80">{prod.sku}</td>
                <td className="px-6 py-4 font-display text-xs text-white">${prod.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${prod.quantity < 50 ? 'bg-red-400' : 'bg-primary'}`} 
                        style={{ width: `${Math.min((prod.quantity / 500) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs ${prod.quantity < 50 ? 'text-red-400 font-bold' : 'text-white'}`}>
                      {prod.quantity}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(prod)}
                      className="p-2 hover:text-white transition-colors text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button 
                      onClick={() => onDelete(prod._id)}
                      className="p-2 hover:text-red-400 transition-colors text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
