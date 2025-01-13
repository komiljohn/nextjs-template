import React from "react";

import { routing } from "@/i18n/routing";

import BaseLayout from "./components/BaseLayout";
import NotFoundPage from "./components/NotFoundPage";

export default function RootNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundPage />
    </BaseLayout>
  );
}
