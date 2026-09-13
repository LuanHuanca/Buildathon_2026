import { AuthForm } from "~/components/auth/auth-form";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="container flex justify-center py-16">
      <div className="w-full max-w-md">
        <p className="text-primary font-mono text-[11px] tracking-widest uppercase">
          Acceso · Cuenta
        </p>
        <h1 className="font-display mt-1 text-3xl font-bold">Iniciar sesión</h1>
        <p className="text-muted-foreground mt-2 mb-8">
          Volvé a tu cuenta para ver tu perfil y tus donaciones.
        </p>
        <AuthForm mode="signin" />
      </div>
    </div>
  );
}
