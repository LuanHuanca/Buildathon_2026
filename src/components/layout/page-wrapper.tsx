import { BottomNav } from "./bottom-nav";
import { Footer } from "./footer";
import { Header } from "./header";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16 pb-20 md:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}
