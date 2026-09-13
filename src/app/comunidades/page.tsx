import { CommunityCatalog } from "~/components/palmera/community-catalog";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function ComunidadesPage() {
  const communities = await api.community.getAll();

  return (
    <div className="container py-8">
      <p className="text-primary font-mono text-[11px] tracking-widest uppercase">
        Explorar · Catálogo on-chain
      </p>
      <h1 className="font-display mt-1 text-3xl font-bold">
        Iniciativas vivas
      </h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        Apoya a comunidades indígenas de Bolivia con transparencia total y
        membresías Web3.
      </p>

      <div className="mt-8">
        <CommunityCatalog communities={communities} />
      </div>
    </div>
  );
}
