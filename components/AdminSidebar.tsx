'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const navItems = [
  { icon: 'dashboard',         label: 'Dashboard', path: '/admin' },
  { icon: 'shopping_bag',      label: 'Orders',    path: '/admin/orders' },
  { icon: 'design_services',   label: 'Designs',   path: '/admin/designs' },
  { icon: 'category',          label: 'Categories',path: '/admin/categories' },
  { icon: 'settings',          label: 'Settings',  path: '/admin/settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const initials =
    session?.user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() ?? 'A';

  return (
    <aside className="w-[220px] flex-shrink-0 bg-surface-container-low border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="p-md border-b border-white/5">
        <div className="text-h2 font-extrabold tracking-tighter text-gradient">QK Admin</div>
        <div className="text-label-caps font-label-caps text-on-surface-variant mt-xs tracking-[0.08em]">
          MANAGEMENT SUITE
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-sm space-y-xs">
        {navItems.map(item => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-sm px-sm py-xs rounded-xl transition-all duration-200 ${
                active
                  ? 'bg-primary/15 text-primary border border-primary/20'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-body-md text-sm">{item.label}</span>
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-md border-t border-white/5">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-sm text-on-surface-variant hover:text-error transition-colors mb-md w-full group"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">logout</span>
          <span className="text-sm">Sign Out</span>
        </button>
        <div className="flex items-center gap-sm">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {initials}
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-on-surface text-sm truncate">
              {session?.user?.name ?? 'Admin'}
            </div>
            <div className="text-on-surface-variant text-xs truncate">
              {session?.user?.email}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
