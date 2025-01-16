import "./globals.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { Locale, routing } from "@/i18n/routing";
import Providers from "@/providers";

import BaseLayout from "../components/BaseLayout";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Visitca",
  description: "Website",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const locale = (await params).locale;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const session = false;

  return (
    <BaseLayout locale={locale}>
      <Providers>
        <NuqsAdapter>
          <Header session={session} />
          {children}
          <Toaster richColors />
        </NuqsAdapter>
      </Providers>
    </BaseLayout>
  );
}
