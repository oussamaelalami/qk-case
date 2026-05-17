import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </div>
  );
}
