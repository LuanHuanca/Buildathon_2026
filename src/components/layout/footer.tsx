import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border/40 bg-surface-container-lowest border-t">
      <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/munay-wordmark.png"
            alt="Munay"
            className="h-14 w-auto max-w-[240px] object-contain object-left mix-blend-multiply"
          />
          <p className="text-muted-foreground mt-1 max-w-md text-sm">
            Transparencia radical para comunidades que merecen ser escuchadas.
          </p>
        </div>
        <nav className="text-muted-foreground flex gap-6 font-mono text-xs tracking-widest uppercase">
          <Link
            href="/comunidades"
            className="hover:text-primary transition-colors"
          >
            Proyectos
          </Link>
          <Link
            href="/transparencia"
            className="hover:text-primary transition-colors"
          >
            Transparencia
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
