'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  address?: string | null;
  ville?: string | null;
  phoneBrand: string;
  phoneModel: string;
  status: string;
  createdAt: string;
  customImage?: string | null;
  notes?: string | null;
  design?: { name: string } | null;
}

const statusColors: Record<string, string> = {
  PENDING:   'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100   text-blue-700',
  PRINTED:   'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100  text-green-700',
  CANCELLED: 'bg-red-100    text-red-700',
};

const statusOptions = ['PENDING', 'CONFIRMED', 'PRINTED', 'DELIVERED', 'CANCELLED'];
const tabs          = ['All Orders', 'Pending', 'Confirmed', 'Printed', 'Delivered'];
const tabFilters    = [undefined, 'PENDING', 'CONFIRMED', 'PRINTED', 'DELIVERED'];

export default function OrdersPage() {
  const [activeTab,  setActiveTab]  = useState(0);
  const [orders,     setOrders]     = useState<Order[]>([]);
  const [total,      setTotal]      = useState(0);
  const [loading,    setLoading]    = useState(true);
  const [page,       setPage]       = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    const filter = tabFilters[activeTab];
    if (filter) params.set('status', filter);
    const res  = await fetch(`/api/admin/orders?${params}`);
    const data = await res.json();
    setOrders(data.orders ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, [activeTab, page]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ status }),
    });
    if (res.ok) { toast.success('Status updated'); fetchOrders(); }
    else          toast.error('Failed to update status');
  };

  const deleteOrder = async (id: string) => {
    if (!confirm('Delete this order?')) return;
    const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Order deleted'); fetchOrders(); }
    else          toast.error('Failed to delete order');
  };

  const toggleExpand = (id: string) =>
    setExpandedId(prev => (prev === id ? null : id));

  return (
    <div className="p-xl">
      <div className="mb-xl">
        <h1 className="font-h1 text-h1 text-on-surface">Orders Management</h1>
        <p className="text-on-surface-variant">Manage and track custom phone case orders.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-xs mb-xl overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(i); setPage(1); setExpandedId(null); }}
            className={`px-md py-xs rounded-full text-body-md font-bold whitespace-nowrap transition-all ${
              activeTab === i
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-xl text-center text-on-surface-variant">Loading orders…</div>
        ) : orders.length === 0 ? (
          <div className="p-xl text-center text-on-surface-variant">No orders found.</div>
        ) : (
          <div className="divide-y divide-outline-variant/10">
            {/* Header */}
            <div className="grid grid-cols-[1fr_130px_120px_40px] gap-3 px-md py-sm bg-surface-container-low text-label-caps font-label-caps text-on-surface-variant text-xs">
              <span>Customer</span>
              <span>Design</span>
              <span>Status</span>
              <span />
            </div>

            {orders.map(order => {
              const isOpen = expandedId === order.id;
              return (
                <div key={order.id}>
                  {/* Collapsed row */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(order.id)}
                    className="w-full grid grid-cols-[1fr_130px_120px_40px] gap-3 px-md py-sm items-center hover:bg-surface-container-low transition-colors text-left"
                  >
                    {/* Customer */}
                    <div>
                      <div className="font-bold text-on-surface text-sm">{order.customerName}</div>
                      <div className="text-on-surface-variant text-xs">{order.phoneNumber}</div>
                    </div>

                    {/* Design thumbnail */}
                    <div className="flex items-center gap-1.5 min-w-0">
                      {order.customImage ? (
                        <img
                          src={order.customImage}
                          alt="design"
                          className="w-7 h-7 rounded object-cover flex-shrink-0 border border-outline-variant/30"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-on-surface-variant text-base">image</span>
                      )}
                      <span className="text-on-surface-variant text-xs truncate">
                        {order.design?.name ?? (order.customImage ? 'Custom' : '—')}
                      </span>
                    </div>

                    {/* Status badge */}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold w-fit ${statusColors[order.status] ?? 'bg-surface-container-high text-on-surface-variant'}`}>
                      {order.status}
                    </span>

                    {/* Expand arrow */}
                    <span className={`material-symbols-outlined text-on-surface-variant text-base transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>

                  {/* Expanded detail panel */}
                  {isOpen && (
                    <div className="bg-surface-container-low border-t border-outline-variant/10 px-md py-md">
                      <div className="flex gap-6 flex-wrap">

                        {/* Design image */}
                        {order.customImage && (
                          <div className="flex flex-col items-center gap-2 flex-shrink-0">
                            <img
                              src={order.customImage}
                              alt="Client design"
                              className="w-36 h-36 rounded-xl object-cover border border-outline-variant/30 shadow-sm"
                            />
                            <a
                              href={order.customImage}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-1.5 bg-primary text-on-primary rounded-full text-xs font-bold hover:opacity-90 transition-opacity"
                            >
                              <span className="material-symbols-outlined text-sm">download</span>
                              Download
                            </a>
                          </div>
                        )}

                        {/* Order details */}
                        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-2 min-w-[240px]">
                          <Detail label="Full Name" value={order.customerName} />
                          <Detail label="Phone"     value={order.phoneNumber} />
                          {order.address && <Detail label="Address"  value={order.address} />}
                          {order.ville   && <Detail label="City"     value={order.ville} />}
                          <Detail label="Brand"  value={order.phoneBrand} />
                          <Detail label="Model"  value={order.phoneModel} />
                          <Detail label="Date"   value={new Date(order.createdAt).toLocaleString()} />
                          {order.notes   && <Detail label="Notes"    value={order.notes} className="col-span-2" />}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 min-w-[160px]">
                          <p className="text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase mb-1">Status</p>
                          <select
                            value={order.status}
                            onChange={e => updateStatus(order.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border-0 cursor-pointer w-full ${statusColors[order.status] ?? 'bg-surface-container-high text-on-surface-variant'}`}
                          >
                            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="flex items-center justify-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors text-xs font-semibold mt-1"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                            Delete order
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="p-md flex items-center justify-between border-t border-outline-variant/20">
          <span className="text-on-surface-variant text-body-md">Total: {total} orders</span>
          <div className="flex items-center gap-xs">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <span className="px-sm font-bold text-on-surface">{page}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={orders.length < 20}
              className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[10px] font-semibold tracking-widest text-on-surface-variant uppercase">{label}</p>
      <p className="text-sm text-on-surface font-medium">{value}</p>
    </div>
  );
}
