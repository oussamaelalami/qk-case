import { supabase } from '@/lib/supabase';
import { DashboardCharts } from '@/components/DashboardCharts';

export const dynamic = 'force-dynamic';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PRINTED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

async function getDashboardData() {
  try {
    const [
      { count: totalOrders },
      { count: pendingOrders },
      { count: totalDesigns },
      { data: recentOrders },
    ] = await Promise.all([
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),
      supabase.from('designs').select('*', { count: 'exact', head: true }).eq('active', true),
      supabase.from('orders').select('id, customerName, phoneNumber, phoneModel, status, createdAt').order('createdAt', { ascending: false }).limit(5),
    ]);
    return {
      totalOrders: totalOrders ?? 0,
      pendingOrders: pendingOrders ?? 0,
      totalDesigns: totalDesigns ?? 0,
      recentOrders: recentOrders ?? [],
    };
  } catch {
    return { totalOrders: 0, pendingOrders: 0, totalDesigns: 0, recentOrders: [] };
  }
}

export default async function AdminDashboard() {
  const { totalOrders, pendingOrders, totalDesigns, recentOrders } = await getDashboardData();

  const stats = [
    { label: 'TOTAL COMMANDES', value: totalOrders.toLocaleString(), icon: 'shopping_bag' },
    { label: 'EN ATTENTE',      value: pendingOrders.toString(),     icon: 'schedule'      },
    { label: 'TOTAL DESIGNS',   value: totalDesigns.toString(),      icon: 'design_services' },
  ];

  return (
    <div className="p-4 lg:p-xl">
      <div className="mb-6 lg:mb-xl flex justify-between items-start">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface">Vue d&apos;ensemble</h1>
          <p className="text-on-surface-variant">Activité du jour.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-md mb-6 lg:mb-xl">
        {stats.map(stat => (
          <div key={stat.label} className="bg-surface-container-lowest rounded-2xl p-md border border-outline-variant/20 shadow-sm">
            <div className="flex justify-between items-start mb-sm">
              <span className="material-symbols-outlined text-primary">{stat.icon}</span>
            </div>
            <div className="text-on-surface-variant text-label-caps font-label-caps mb-xs">{stat.label}</div>
            <div className="font-h1 text-h1 text-on-surface font-extrabold">{stat.value}</div>
            <div className="mt-sm h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full w-3/4" />
            </div>
          </div>
        ))}
      </div>


      <DashboardCharts />

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-4 lg:p-lg border-b border-outline-variant/20">
          <h2 className="font-h2 text-h2 text-on-surface">Commandes récentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead>
              <tr className="border-b border-outline-variant/20">
                <th className="text-left py-sm px-4 lg:px-lg text-label-caps font-label-caps text-on-surface-variant">CLIENT</th>
                <th className="text-left py-sm px-4 lg:px-lg text-label-caps font-label-caps text-on-surface-variant hidden sm:table-cell">TÉLÉPHONE</th>
                <th className="text-left py-sm px-4 lg:px-lg text-label-caps font-label-caps text-on-surface-variant">MODÈLE</th>
                <th className="text-left py-sm px-4 lg:px-lg text-label-caps font-label-caps text-on-surface-variant">STATUT</th>
                <th className="text-left py-sm px-4 lg:px-lg text-label-caps font-label-caps text-on-surface-variant hidden md:table-cell">DATE</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order: { id: string; customerName: string; phoneNumber: string; phoneModel: string; status: string; createdAt: string }) => (
                <tr key={order.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                  <td className="py-md px-4 lg:px-lg">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                        {order.customerName[0]}
                      </div>
                      <div className="font-bold text-on-surface text-sm truncate max-w-[100px] sm:max-w-none">{order.customerName}</div>
                    </div>
                  </td>
                  <td className="py-md px-4 lg:px-lg text-on-surface text-sm hidden sm:table-cell">{order.phoneNumber}</td>
                  <td className="py-md px-4 lg:px-lg text-on-surface text-sm">{order.phoneModel}</td>
                  <td className="py-md px-4 lg:px-lg">
                    <span className={`px-sm py-xs rounded-full text-label-caps font-label-caps text-[10px] whitespace-nowrap ${statusColors[order.status] || 'bg-surface-container-high text-on-surface-variant'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-md px-4 lg:px-lg text-on-surface-variant text-sm hidden md:table-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
