import { AuthForm } from "~/components/auth/auth-form";

export const dynamic = "force-dynamic";

export default function RegistroPage() {
  return (
    <div className="container flex justify-center py-16">
      <div className="w-full max-w-md">
        <p className="text-primary font-mono text-[11px] tracking-widest uppercase">
          Acceso · Cuenta
        </p>
        <h1 className="font-display mt-1 text-3xl font-bold">Crear cuenta</h1>
        <p className="text-muted-foreground mt-2 mb-8">
          Sumate como co-custodio de la biodiversidad boliviana.
        </p>
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
