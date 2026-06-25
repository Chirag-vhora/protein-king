import OrdersTable from '../components/OrdersTable.jsx';
import { updateOrderStatus } from '../../../services/api.js';

export default function OrdersView({ orders, refreshData }) {
  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      refreshData();
    } catch (error) {
      console.error(error);
      alert(error.message || 'Status update failed');
    }
  };

  return (
    <div>
      <header className="mb-6 md:mb-12">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">Fulfillment Portal</h2>
        <p className="font-sans text-xs text-on-surface-variant max-w-xl">
          Audit customer orders, monitor payment verifications, and route shipping status flags.
        </p>
      </header>

      <OrdersTable orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
}
