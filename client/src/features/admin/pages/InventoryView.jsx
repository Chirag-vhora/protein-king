import { useState } from 'react';
import InventoryStats from '../components/InventoryStats.jsx';
import ProductTable from '../components/ProductTable.jsx';
import ProductModal from '../components/ProductModal.jsx';
import { createProduct, updateProduct, deleteProduct } from '../../../services/api.js';

export default function InventoryView({ products, refreshData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingProduct(null);
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormError('');
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirm permanent deletion from database?')) return;
    try {
      await deleteProduct(id);
      refreshData();
    } catch (error) {
      console.error(error);
      alert(error.message || 'Delete failed');
    }
  };

  const handleSubmit = async (formData) => {
    const images = [formData.image1, formData.image2, formData.image3]
      .map(image => image.trim())
      .filter(Boolean);

    if (!formData.name.trim() || !formData.description.trim() || images.length === 0 || Number(formData.price) <= 0) {
      setFormError('Please fill all required inputs.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      quantity: Number.parseInt(formData.quantity, 10) || 0,
      category: formData.category,
      images,
      flavors: formData.flavors.split(',').map(f => f.trim()).filter(Boolean)
    };

    if (formData.sku.trim()) {
      payload.sku = formData.sku.trim();
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, payload);
      } else {
        await createProduct(payload);
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

      {/* Stats Cards */}
      <InventoryStats products={products} />

      {/* Product Catalog Table */}
      <ProductTable 
        products={products} 
        onEdit={openEditModal} 
        onDelete={handleDelete} 
      />

      {/* Product Modal CRUD */}
      <ProductModal
        key={modalOpen ? editingProduct?._id || 'new-product' : 'closed-product-modal'}
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSubmit={handleSubmit} 
        editingProduct={editingProduct} 
        formError={formError} 
      />
    </div>
  );
}
