

export default function InventoryStats({ products }) {
  const totalStock = products.reduce((acc, p) => acc + p.quantity, 0);
  const activeListings = products.length;
  const lowStockCount = products.filter(p => p.quantity < 50).length;
  const inventoryHealth = activeListings > 0 
    ? (((activeListings - lowStockCount) / activeListings) * 100).toFixed(1) 
    : 100;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="glass-panel p-6 inner-glow flex flex-col gap-2">
        <span className="text-on-secondary-container font-display text-[9px] tracking-widest uppercase font-bold">Total Stock Units</span>
        <div className="flex justify-between items-baseline">
          <span className="font-display font-extrabold text-3xl text-primary">{totalStock.toLocaleString()}</span>
          <span className="text-green-400 text-xs font-bold flex items-center gap-1 font-display">
            <span className="material-symbols-outlined text-sm">trending_up</span> 14%
          </span>
        </div>
      </div>
      <div className="glass-panel p-6 inner-glow flex flex-col gap-2">
        <span className="text-on-secondary-container font-display text-[9px] tracking-widest uppercase font-bold">Active Listings</span>
        <div className="flex justify-between items-baseline">
          <span className="font-display font-extrabold text-3xl text-primary">{activeListings}</span>
          <span className="text-white/40 text-xs font-bold font-display">STABLE</span>
        </div>
      </div>
      <div className="glass-panel p-6 inner-glow flex flex-col gap-2">
        <span className="text-on-secondary-container font-display text-[9px] tracking-widest uppercase font-bold">Inventory Health</span>
        <div className="flex justify-between items-baseline">
          <span className="font-display font-extrabold text-3xl text-primary">{inventoryHealth}%</span>
          <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
        </div>
      </div>
    </section>
  );
}
