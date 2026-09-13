import { ProfileView } from "~/components/user/profile-view";

export const dynamic = "force-dynamic";

export default function PerfilPage() {
  return (
    <div className="container py-8">
      <p className="text-primary font-mono text-[11px] tracking-widest uppercase">
        Perfil · Cuenta Web3
      </p>
      <div className="mt-6">
        <ProfileView
          user={{
            name: "Mi cuenta Munay",
            email: "Identidad vinculada a tu wallet",
            createdAt: new Date().toISOString(),
          }}
        />
      </div>
    </div>
  );
}
