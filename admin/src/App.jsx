import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5001/api';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('auraAdminToken') === 'kingpro-session-active');
  const [activeTab, setActiveTab] = useState('inventory');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loginAdmin = () => {
    localStorage.setItem('auraAdminToken', 'kingpro-session-active');
    setIsLoggedIn(true);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('auraAdminToken');
    setIsLoggedIn(false);
  };

  // Fetch data
  const fetchData = async () => {
    try {
      const prodRes = await fetch(`${API_BASE}/products`);
      const prodData = await prodRes.json();
      setProducts(prodData);

      const ordRes = await fetch(`${API_BASE}/orders`);
      const ordData = await ordRes.json();
      setOrders(ordData);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <AdminLoginPage onLoginSuccess={loginAdmin} />;
  }

  return (
    <Router>
      <div className="bg-surface-dim text-on-surface font-sans min-h-screen flex overflow-hidden">
        {/* Background Mesh */}
        <div className="mesh-gradient"></div>

        {/* Sidebar Nav */}
        <aside className="fixed left-0 h-full w-64 bg-surface-container-lowest/90 backdrop-blur-2xl border-r border-white/5 shadow-2xl flex flex-col p-6 z-40">
          <div className="mb-12">
            <h1 className="font-display font-bold text-xl text-primary tracking-tighter mb-1">ADMIN PORTAL</h1>
            <p className="font-display text-[9px] font-bold text-on-tertiary-container tracking-widest opacity-60">SYSTEM COMMAND</p>
          </div>

          <nav className="flex-grow space-y-2">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center gap-4 px-4 py-3 font-display font-semibold text-xs tracking-wider transition-all duration-300 ${
                activeTab === 'inventory' 
                  ? 'bg-white/10 text-primary border-r-2 border-primary' 
                  : 'text-on-secondary-container hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'inventory' ? "'FILL' 1" : "'FILL' 0" }}>inventory_2</span>
              <span>INVENTORY</span>
            </button>

            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-4 px-4 py-3 font-display font-semibold text-xs tracking-wider transition-all duration-300 ${
                activeTab === 'orders' 
                  ? 'bg-white/10 text-primary border-r-2 border-primary' 
                  : 'text-on-secondary-container hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'orders' ? "'FILL' 1" : "'FILL' 0" }}>receipt_long</span>
              <span>ORDERS</span>
            </button>
          </nav>

          <div className="mt-auto space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 flex items-center justify-center bg-white/10">
                <span className="material-symbols-outlined text-primary text-xl">admin_panel_settings</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-white uppercase">SYSTEM OPERATOR</span>
                <button onClick={logoutAdmin} className="text-[8px] text-primary tracking-wider text-left hover:underline uppercase font-semibold">LOG OUT</button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="ml-64 flex-grow relative overflow-y-auto min-h-screen">
          {loading ? (
            <div className="text-center py-40 text-on-surface-variant">LOADING CONTROL SYSTEM...</div>
          ) : (
            <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-12">
              {activeTab === 'inventory' ? (
                <InventoryView products={products} refreshData={fetchData} />
              ) : (
                <OrdersView orders={orders} refreshData={fetchData} />
              )}
            </div>
          )}
        </main>
      </div>
    </Router>
  );
}

// --- INVENTORY VIEW ---
function InventoryView({ products, refreshData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: 0,
    quantity: 0,
    category: 'WHEY',
    imageUrl: '',
    servings: '30 Servings',
    protein: '',
    carbs: '',
    fat: '',
    calories: '',
    flavors: 'Chocolate, Vanilla'
  });

  const [formError, setFormError] = useState('');

  // Calculate Stats
  const totalStock = products.reduce((acc, p) => acc + p.quantity, 0);
  const activeListings = products.length;
  const lowStockCount = products.filter(p => p.quantity < 50).length;
  const inventoryHealth = activeListings > 0 ? (((activeListings - lowStockCount) / activeListings) * 100).toFixed(1) : 100;

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      sku: '',
      description: '',
      price: 0,
      quantity: 0,
      category: 'WHEY',
      imageUrl: '',
      servings: '30 Servings',
      protein: '0G',
      carbs: '0G',
      fat: '0G',
      calories: '0 KCAL',
      flavors: 'Chocolate, Vanilla'
    });
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      imageUrl: product.imageUrl,
      servings: product.servings || '30 Servings',
      protein: product.nutrition?.protein || '',
      carbs: product.nutrition?.carbs || '',
      fat: product.nutrition?.fat || '',
      calories: product.nutrition?.calories || '',
      flavors: product.flavors ? product.flavors.join(', ') : 'Chocolate, Vanilla'
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirm permanent deletion from database?')) return;
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        refreshData();
      } else {
        const err = await res.json();
        alert(err.message || 'Delete failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sku || !formData.imageUrl || formData.price <= 0) {
      setFormError('Please fill all required inputs.');
      return;
    }

    const payload = {
      name: formData.name,
      sku: formData.sku,
      description: formData.description,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      category: formData.category,
      imageUrl: formData.imageUrl,
      servings: formData.servings,
      tags: [formData.category === 'WHEY' ? 'Pure Isolate' : formData.category === 'PRE-WORKOUT' ? 'Focus Max' : 'Pure Strength'],
      flavors: formData.flavors.split(',').map(f => f.trim()).filter(Boolean),
      nutrition: {
        protein: formData.protein,
        carbs: formData.carbs,
        fat: formData.fat,
        calories: formData.calories,
        leucine: formData.category === 'WHEY' ? '3.2G' : '0G',
        bcaa: formData.category === 'WHEY' ? '6.8G' : '0G',
        glutamine: formData.category === 'WHEY' ? '5.1G' : '0G'
      }
    };

    try {
      let url = `${API_BASE}/products`;
      let method = 'POST';

      if (editingProduct) {
        url = `${API_BASE}/products/${editingProduct._id}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Operation failed');
      }

      setModalOpen(false);
      refreshData();
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
        <div>
          <h2 className="font-display font-bold text-3xl text-white mb-2">Inventory Management</h2>
          <p className="font-sans text-xs text-on-surface-variant max-w-xl">
            Monitor and adjust your premium supplement stocks. Real-time engineering metrics for high-end performance supply chains.
          </p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-white text-black px-6 py-3 font-display font-semibold text-xs flex items-center justify-center gap-2 btn-primary-glow transition-all active:scale-95 self-start md:self-end"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          ADD NEW PRODUCT
        </button>
      </header>

      {/* Stats Grid */}
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

      {/* Table Catalog */}
      <section className="glass-panel overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="font-display font-semibold text-lg text-white">Product Catalog</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
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
                      <img className="max-w-full max-h-full object-contain" src={prod.imageUrl} alt={prod.name} />
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
                    <div className="flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(prod)}
                        className="p-2 hover:text-white transition-colors text-on-surface-variant"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(prod._id)}
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

      {/* Modal CRUD */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setModalOpen(false)}></div>
          <div className="relative glass-modal w-full max-w-lg mx-4 p-8 overflow-y-auto max-h-[90vh]">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display font-bold text-lg text-white mb-1">
                    {editingProduct ? 'Edit Performance Unit' : 'New Performance Unit'}
                  </h2>
                  <p className="text-[9px] font-bold text-on-surface-variant tracking-widest uppercase">
                    {editingProduct ? 'Update ledger information' : 'Register inventory SKU'}
                  </p>
                </div>
                <button className="text-white/40 hover:text-white" onClick={() => setModalOpen(false)}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {formError && (
                <div className="text-red-400 text-xs font-display p-2 bg-red-950/20 border border-red-900/50 rounded mb-4">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Product Designation (Name) *</label>
                  <input 
                    className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                    placeholder="e.g., ISO-WHEY ELITE" 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">System SKU *</label>
                    <input 
                      className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                      placeholder="AURA-X-000" 
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Price (USD) *</label>
                    <input 
                      className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                      placeholder="0.00" 
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Initial Stock *</label>
                    <input 
                      className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                      placeholder="Units in batch" 
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Category</label>
                    <select 
                      className="w-full bg-surface-dim border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="WHEY">WHEY</option>
                      <option value="VEGAN">VEGAN</option>
                      <option value="PRE-WORKOUT">PRE-WORKOUT</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Product Image URL *</label>
                  <input 
                    className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                    placeholder="https://..." 
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Description</label>
                  <textarea 
                    className="w-full bg-transparent border border-white/20 focus:border-white focus:ring-0 text-white p-2 transition-all outline-none text-sm h-16"
                    placeholder="Elite formulation details..." 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Servings Size</label>
                    <input 
                      className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                      placeholder="e.g. 30 Servings" 
                      type="text"
                      name="servings"
                      value={formData.servings}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Flavors (comma separated)</label>
                    <input 
                      className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                      placeholder="Chocolate, Vanilla" 
                      type="text"
                      name="flavors"
                      value={formData.flavors}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block mb-2">Nutritional Values (Optional)</span>
                  <div className="grid grid-cols-4 gap-2">
                    <input 
                      className="bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white text-center py-1 text-xs" 
                      placeholder="Prot (28G)" 
                      name="protein"
                      value={formData.protein}
                      onChange={handleInputChange}
                    />
                    <input 
                      className="bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white text-center py-1 text-xs" 
                      placeholder="Carbs (1G)" 
                      name="carbs"
                      value={formData.carbs}
                      onChange={handleInputChange}
                    />
                    <input 
                      className="bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white text-center py-1 text-xs" 
                      placeholder="Fat (0.5G)" 
                      name="fat"
                      value={formData.fat}
                      onChange={handleInputChange}
                    />
                    <input 
                      className="bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white text-center py-1 text-xs" 
                      placeholder="Cal (120 KCAL)" 
                      name="calories"
                      value={formData.calories}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                  <button 
                    type="submit"
                    className="w-full bg-white text-black py-4 font-display font-semibold text-xs btn-primary-glow active:scale-[0.98] transition-all"
                  >
                    CONFIRM AND WRITE TO LEDGER
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- ORDERS VIEW ---
function OrdersView({ orders, refreshData }) {
  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: status })
      });
      if (res.ok) {
        refreshData();
      } else {
        const err = await res.json();
        alert(err.message || 'Status update failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <header className="mb-12">
        <h2 className="font-display font-bold text-3xl text-white mb-2">Fulfillment Portal</h2>
        <p className="font-sans text-xs text-on-surface-variant max-w-xl">
          Audit customer orders, monitor payment verifications, and route shipping status flags.
        </p>
      </header>

      <section className="glass-panel overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h3 className="font-display font-semibold text-lg text-white">Order History</h3>
        </div>
        <div className="overflow-x-auto">
          {orders.length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant">No orders placed in ledger yet.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 font-display text-[9px] font-bold tracking-widest text-on-secondary-container uppercase">Order ID</th>
                  <th className="px-6 py-4 font-display text-[9px] font-bold tracking-widest text-on-secondary-container uppercase">Customer Info</th>
                  <th className="px-6 py-4 font-display text-[9px] font-bold tracking-widest text-on-secondary-container uppercase">Items Ordered</th>
                  <th className="px-6 py-4 font-display text-[9px] font-bold tracking-widest text-on-secondary-container uppercase">Total Amount</th>
                  <th className="px-6 py-4 font-display text-[9px] font-bold tracking-widest text-on-secondary-container uppercase text-right">Status Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-display text-[10px] text-primary opacity-60">
                      {order._id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-xs">{order.customerName}</div>
                      <div className="text-[10px] text-on-surface-variant font-sans mt-0.5">{order.customerEmail}</div>
                      <div className="text-[9px] text-outline font-sans mt-1 w-48 truncate" title={order.shippingAddress}>
                        {order.shippingAddress}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-xs text-white/90">
                            {item.product ? item.product.name : 'Unknown Product'} 
                            <span className="text-outline text-[10px] ml-1">x{item.quantity} ({item.flavor})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-display text-xs text-white font-bold">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`bg-surface-dim border border-white/10 rounded text-xs py-1 px-2 font-display outline-none ${
                          order.orderStatus === 'Delivered' 
                            ? 'text-green-400 border-green-500/30' 
                            : order.orderStatus === 'Shipped' 
                            ? 'text-yellow-400 border-yellow-500/30' 
                            : 'text-primary'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

// --- ADMIN LOGIN LOCK VIEW ---
function AdminLoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'kingpro' && password === 'kingpro00') {
      onLoginSuccess();
    } else {
      setError('ACCESS DENIED: INVALID LEDGER CREDENTIALS');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-surface-dim relative font-sans text-on-surface">
      <div className="mesh-gradient"></div>
      <div className="max-w-[400px] w-full mx-4 p-8 glass-modal rounded-xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-[80px]"></div>
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h2 className="font-display font-bold text-xl text-white mb-1">SYSTEM AUTHENTICATION</h2>
            <p className="text-[9px] font-bold text-outline tracking-widest uppercase">Admin console encryption check</p>
          </div>

          {error && (
            <div className="text-red-400 text-xs font-display p-2 bg-red-950/20 border border-red-900/50 rounded mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="font-display text-[9px] font-bold text-outline mb-1">OPERATOR ID</label>
              <input 
                className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                placeholder="e.g. kingpro" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-display text-[9px] font-bold text-outline mb-1">PASSCODE</label>
              <input 
                className="w-full bg-transparent border-none border-b border-white/20 focus:border-white focus:ring-0 text-white py-2 transition-all outline-none text-sm"
                placeholder="••••••••" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-white text-black py-4 font-display font-bold text-xs tracking-widest transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              DECRYPT CONTROL CATALOG
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
