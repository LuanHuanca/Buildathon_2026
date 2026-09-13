import { AuthForm } from "~/components/auth/auth-form";

export const dynamic = "force-dynamic";

export default function RegistroPage() {
  return (
    <div className="container flex justify-center py-16">
      <div className="w-full max-w-md">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          Acceso · Cuenta
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold">Crear cuenta</h1>
        <p className="mb-8 mt-2 text-muted-foreground">
          Sumate como co-custodio de la biodiversidad boliviana.
        </p>
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
