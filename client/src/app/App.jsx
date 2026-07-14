import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar.jsx';
import Footer from '../components/common/Footer.jsx';
import SmoothScroll from '../components/common/SmoothScroll.jsx';
import ScrollToTop from '../components/common/ScrollToTop.jsx';
import StorefrontPage from '../features/home/pages/StorefrontPage.jsx';
import ProductDetailsPage from '../features/products/pages/ProductDetailsPage.jsx';
import ProductsCatalogPage from '../features/products/pages/ProductsCatalogPage.jsx';
import CartPage from '../features/cart/pages/CartPage.jsx';
import SuccessPage from '../features/checkout/pages/SuccessPage.jsx';
import LoginPage from '../features/auth/pages/LoginPage.jsx';
import RegisterPage from '../features/auth/pages/RegisterPage.jsx';
import AdminDashboard from '../features/admin/pages/AdminDashboard.jsx';
import {
  AboutPage,
  ContactPage,
  FaqPage,
  PrivacyPolicyPage,
  RefundPolicyPage,
  ShippingPolicyPage,
  TermsPage,
} from '../features/info/pages/index.js';
import { getProducts, getCurrentUser } from '../services/api.js';

function AppContent() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('auraUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const [introPlayed, setIntroPlayed] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIntroPlayed(true);
    }
  }, [location.pathname]);

  const loginUser = (userData, token) => {
    localStorage.setItem('auraUser', JSON.stringify(userData));
    localStorage.setItem('auraToken', token);
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('auraUser');
    localStorage.removeItem('auraToken');
    localStorage.removeItem('auraAdminToken');
    setUser(null);
  };

  // Load products from DB
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();

    // Verify session if token exists
    const token = localStorage.getItem('auraToken');
    if (token) {
      getCurrentUser(token)
        .then(data => {
          localStorage.setItem('auraUser', JSON.stringify(data.user));
          setUser(data.user);
        })
        .catch(err => {
          console.error('Session verification failed:', err);
          localStorage.removeItem('auraUser');
          localStorage.removeItem('auraToken');
          setUser(null);
        });
    }
  }, []);

  // Cart operations
  const addToCart = (product, quantity, flavor) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product._id === product._id && item.flavor === flavor);
      if (existing) {
        return prevCart.map(item => 
          (item.product._id === product._id && item.flavor === flavor)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity, flavor }];
    });
  };

  const removeFromCart = (productId, flavor) => {
    setCart(prevCart => prevCart.filter(item => !(item.product._id === productId && item.flavor === flavor)));
  };

  const updateQuantity = (productId, flavor, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.product._id === productId && item.flavor === flavor) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen relative font-sans bg-surface-dim text-on-surface">
      <SmoothScroll />

      {/* Background Mesh */}
      <div className="mesh-gradient"></div>

      {/* Global Navigation */}
      {!isAdminPath && (
        <Navbar cartCount={cartCount} user={user} logoutUser={logoutUser} />
      )}

      {/* Routes */}
      <div className={isAdminPath ? "" : "pt-20"}>
        <Routes>
          <Route path="/" element={<StorefrontPage products={products} loading={loading} addToCart={addToCart} introPlayed={introPlayed} />} />
          <Route path="/products" element={<ProductsCatalogPage products={products} loading={loading} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetailsPage products={products} addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} user={user} />} />
          <Route path="/login" element={<LoginPage loginUser={loginUser} />} />
          <Route path="/register" element={<RegisterPage loginUser={loginUser} />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
          <Route path="/shipping" element={<ShippingPolicyPage />} />
          <Route path="/replacement-refund-policy" element={<RefundPolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>

      {/* Global Footer */}
      {!isAdminPath && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
