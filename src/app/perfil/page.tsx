import { redirect } from "next/navigation";

import { ProfileView } from "~/components/user/profile-view";
import { getSession } from "~/server/better-auth/server";

export const dynamic = "force-dynamic";

export default async function PerfilPage() {
  const session = await getSession();
  if (!session?.user) redirect("/login");

  const createdAt =
    session.user.createdAt instanceof Date
      ? session.user.createdAt.toISOString()
      : String(session.user.createdAt ?? new Date());

  return (
    <div className="container py-8">
      <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
        Perfil · Cuenta Web3
      </p>
      <div className="mt-6">
        <ProfileView
          user={{
            name: session.user.name,
            email: session.user.email,
            createdAt,
          }}
        />
      </div>
    </div>
  );
}
