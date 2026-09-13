import { BottomNav } from "./bottom-nav";
import { Footer } from "./footer";
import { Header } from "./header";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-foreground">
      <Header />
      <main className="flex-1 pb-20 pt-16 md:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}
