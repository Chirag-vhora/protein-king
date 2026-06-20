import { API_BASE } from '../constants/config.js';

// --- PRODUCTS API SERVICES ---

export const getProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to fetch products');
  }
  return await res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to fetch product details');
  }
  return await res.json();
};

export const createProduct = async (payload) => {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create product');
  }
  return data;
};

export const updateProduct = async (id, payload) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update product');
  }
  return data;
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete product');
  }
  return data;
};

// --- ORDERS API SERVICES ---

export const getOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to fetch orders');
  }
  return await res.json();
};

export const createOrder = async (payload) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to place order');
  }
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${API_BASE}/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderStatus: status })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update order status');
  }
  return data;
};
