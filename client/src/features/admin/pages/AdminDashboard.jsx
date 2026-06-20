import React, { useState, useEffect } from 'react';
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
      />

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
  );
}
