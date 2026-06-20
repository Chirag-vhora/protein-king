import React from 'react';

export default function OrdersTable({ orders, onStatusChange }) {
  return (
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
                      onChange={(e) => onStatusChange(order._id, e.target.value)}
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
  );
}
