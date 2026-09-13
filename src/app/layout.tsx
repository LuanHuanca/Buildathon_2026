import "~/styles/globals.css";

import { type Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";

import { PageWrapper } from "~/components/layout/page-wrapper";
import { WagmiProvider } from "~/components/web3/wagmi-provider";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Palmera",
  description:
    "Plataforma token-gated que conecta aliados globales con comunidades indígenas de Bolivia.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["500", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-surface font-sans text-foreground antialiased">
        <TRPCReactProvider>
          <WagmiProvider>
            <PageWrapper>{children}</PageWrapper>
          </WagmiProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
