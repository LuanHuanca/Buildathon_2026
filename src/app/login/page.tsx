import { AuthForm } from "~/components/auth/auth-form";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="container flex justify-center py-16">
      <div className="w-full max-w-md">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          Acceso · Cuenta
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold">Iniciar sesión</h1>
        <p className="mb-8 mt-2 text-muted-foreground">
          Volvé a tu cuenta para ver tu perfil y tus donaciones.
        </p>
        <AuthForm mode="signin" />
      </div>
    </div>
  );
}
