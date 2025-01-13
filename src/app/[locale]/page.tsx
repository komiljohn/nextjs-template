"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <div>
      {t("title")}
      <div className="p-[400px] space-x-2">
        <Button variant="secondary">Cancel</Button>
        <Button variant="outline">Outline</Button>
        <Button>Submit</Button>
      </div>
    </div>
  );
}
