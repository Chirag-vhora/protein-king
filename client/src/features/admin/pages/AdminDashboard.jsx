import { useState, useEffect } from 'react';
import Sidebar from '../../../components/common/Sidebar.jsx';
import AdminLoginPage from '../../auth/pages/AdminLoginPage.jsx';
import InventoryView from './InventoryView.jsx';
import OrdersView from './OrdersView.jsx';
import { getProducts, getOrders } from '../../../services/api.js';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('auraAdminToken') === 'kingpro-session-active');
  const [activeTab, setActiveTab] = useState('inventory');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      const prodData = await getProducts();
      setProducts(prodData);

      const ordData = await getOrders();
      setOrders(ordData);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchData();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <AdminLoginPage onLoginSuccess={loginAdmin} />;
  }

  return (
    <div className="bg-surface-dim text-on-surface font-sans min-h-screen flex overflow-hidden">
      {/* Background Mesh */}
      <div className="mesh-gradient"></div>

      {/* Sidebar Nav */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        logoutAdmin={logoutAdmin} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="ml-0 lg:ml-64 flex-grow relative overflow-y-auto min-h-screen flex flex-col">
        {/* Mobile Top Header */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-surface-container-lowest/80 backdrop-blur-md border-b border-white/5 z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-primary hover:bg-white/5 rounded-full"
              aria-label="Open Admin Menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <span className="font-display font-bold text-sm text-primary tracking-tighter">ADMIN PANEL</span>
          </div>
          <span className="font-display text-[9px] font-bold text-outline tracking-wider uppercase border border-white/10 px-2 py-0.5 rounded bg-white/5">
            {activeTab}
          </span>
        </header>

        {loading ? (
          <div className="text-center py-40 text-on-surface-variant flex-grow">LOADING CONTROL SYSTEM...</div>
        ) : (
          <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-6 md:py-12 flex-grow w-full">
            {activeTab === 'inventory' ? (
              <InventoryView products={products} refreshData={fetchData} />
            ) : (
              <OrdersView orders={orders} refreshData={fetchData} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
