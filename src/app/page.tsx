export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <p className="font-display text-5xl font-bold tracking-tight text-palmera-indigo">
          Palmera
        </p>
        <p className="max-w-xl text-lg text-palmera-slate">
          Transparencia radical para comunidades indígenas de Bolivia.
        </p>
        <p className="text-sm text-palmera-muted">
          Landing, /comunidades y /transparencia llegan en la Fase 4.
        </p>
      </div>
    </main>
  );
}
