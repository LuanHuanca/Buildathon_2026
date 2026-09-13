import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-palmera-ochre">
            Palmera
          </p>
          <p className="mt-1 max-w-md text-sm text-palmera-slate">
            Transparencia radical para comunidades que merecen ser escuchadas.
          </p>
        </div>
        <nav className="flex gap-6 text-sm text-palmera-slate">
          <Link
            href="/comunidades"
            className="transition-colors hover:text-foreground"
          >
            Proyectos
          </Link>
          <Link
            href="/transparencia"
            className="transition-colors hover:text-foreground"
          >
            Transparencia
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
