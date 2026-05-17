'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (result?.error) {
        toast.error('Invalid email or password');
      } else {
        router.push('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-gutter">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[55%] h-[55%] bg-primary/8 blur-[160px] rounded-full animate-glow-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[45%] h-[45%] bg-tertiary/8 blur-[140px] rounded-full animate-glow-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,200,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,200,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[420px]"
      >
        <div className="bg-surface-container-low rounded-2xl border border-white/5 p-xl shadow-2xl shadow-black/50">
          <div className="text-center mb-lg">
            <div className="text-h1 font-extrabold tracking-tighter text-gradient mb-xs">
              QK Admin
            </div>
            <p className="text-on-surface-variant text-sm">
              Sign in to manage your store
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-md">
            <div>
              <label className="block text-label-caps font-label-caps text-on-surface-variant mb-xs tracking-[0.1em]">
                EMAIL
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
                className="w-full px-md py-sm rounded-xl border border-white/8 bg-surface-container text-on-surface focus:outline-none focus:border-primary/50 focus:bg-surface-container-high transition-all duration-200 placeholder:text-on-surface-variant"
                placeholder="admin@qkcase.com"
              />
            </div>

            <div>
              <label className="block text-label-caps font-label-caps text-on-surface-variant mb-xs tracking-[0.1em]">
                PASSWORD
              </label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                className="w-full px-md py-sm rounded-xl border border-white/8 bg-surface-container text-on-surface focus:outline-none focus:border-primary/50 focus:bg-surface-container-high transition-all duration-200 placeholder:text-on-surface-variant"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-sm bg-gradient-to-r from-primary to-tertiary text-white rounded-xl font-bold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-primary/20 hover:shadow-primary/35 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-sm">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
