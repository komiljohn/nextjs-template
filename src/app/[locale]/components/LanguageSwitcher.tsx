import { Languages } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/i18n/routing";

const activeLocaleLabel = {
  uz: "O'zbekcha",
  ru: "Русский",
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        defaultValue={locale}
        className="flex items-center gap-1.5 border rounded-xl py-[9px] px-[15px] h-10"
      >
        <Languages size={20} />
        <span className="text-sm">{activeLocaleLabel[locale as Locale]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-[150px] min-w-[150px] p-2">
        <DropdownMenuLabel className="text-base font-bold">Tilni tanlang</DropdownMenuLabel>
        <DropdownMenuItem
          onSelect={() => handleLanguageChange("uz")}
          className="flex gap-2 items-center  py-[9px] h-10 px-3 cursor-pointer"
        >
          <Image src="/icons/uzbekistan.svg" width={20} height={20} alt="Uzbekistan" />
          O'zbekcha
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => handleLanguageChange("ru")}
          className="flex gap-2 items-center  py-[9px] h-10 px-3 cursor-pointer"
        >
          <Image src="/icons/russia.svg" width={20} height={20} alt="Russia" />
          Русский
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
