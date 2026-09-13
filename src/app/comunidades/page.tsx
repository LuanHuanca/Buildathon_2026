import { CommunityCatalog } from "~/components/palmera/community-catalog";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function ComunidadesPage() {
  const communities = await api.community.getAll();

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-bold">Comunidades</h1>
      <p className="mt-2 text-palmera-slate">
        Apoya a comunidades indígenas de Bolivia con transparencia total.
      </p>
      <div className="mt-8">
        <CommunityCatalog communities={communities} />
      </div>
    </div>
  );
}
