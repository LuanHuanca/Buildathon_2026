import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";

import { PageWrapper } from "~/components/layout/page-wrapper";
import {
  PrivyAuthProvider,
  Web3Provider,
} from "~/components/web3/privy-provider";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Munay",
  description:
    "Culturas que nos unen. Archivo y apoyo para comunidades indígenas de Bolivia.",
};

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-surface text-foreground font-sans antialiased">
        <PrivyAuthProvider>
          <TRPCReactProvider>
            <Web3Provider>
              <PageWrapper>{children}</PageWrapper>
            </Web3Provider>
          </TRPCReactProvider>
        </PrivyAuthProvider>
      </body>
    </html>
  );
}
