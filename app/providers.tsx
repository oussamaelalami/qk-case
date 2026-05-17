'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { I18nProvider } from '@/lib/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <I18nProvider>
        {children}
        <Toaster richColors position="top-right" />
      </I18nProvider>
    </SessionProvider>
  );
}
