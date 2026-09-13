import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-surface-container-lowest">
      <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-primary">
            Palmera
          </p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Transparencia radical para comunidades que merecen ser escuchadas.
          </p>
        </div>
        <nav className="flex gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Link
            href="/comunidades"
            className="transition-colors hover:text-primary"
          >
            Proyectos
          </Link>
          <Link
            href="/transparencia"
            className="transition-colors hover:text-primary"
          >
            Transparencia
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
