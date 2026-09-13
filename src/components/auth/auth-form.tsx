"use client";

import { Loader2, MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authClient } from "~/server/better-auth/client";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
        });
        if (error) {
          toast.error(error.message ?? "No se pudo crear la cuenta");
          return;
        }
        setSentEmail(email);
      } else {
        const { error } = await authClient.signIn.email({ email, password });
        if (error) {
          toast.error(error.message ?? "Credenciales inválidas");
          return;
        }
        router.push("/perfil");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  if (sentEmail) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border/40 bg-surface-container-low p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
          <MailCheck className="h-7 w-7 text-primary" />
        </span>
        <h2 className="font-display text-xl font-bold">Verifica tu correo</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Te enviamos un enlace de verificación a{" "}
          <span className="font-mono text-foreground">{sentEmail}</span>. Revisa
          MailHog en{" "}
          <a
            href="http://localhost:8025"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-primary underline"
          >
            http://localhost:8025
          </a>{" "}
          y hace clic en el enlace para activar tu cuenta.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignup && (
          <div className="space-y-2">
            <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Nombre
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </div>
        )}
        <div className="space-y-2">
          <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Email
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Contraseña
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            minLength={8}
            required
          />
        </div>

        <Button type="submit" size="lg" disabled={loading} className="mt-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSignup ? "Crear cuenta" : "Iniciar sesión"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        {isSignup ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}{" "}
        <Link
          href={isSignup ? "/login" : "/registro"}
          className="font-mono text-xs uppercase tracking-wide text-primary hover:underline"
        >
          {isSignup ? "Iniciar sesión" : "Crear cuenta"}
        </Link>
      </p>
    </div>
  );
}
