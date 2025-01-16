import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import LoginModal from "./LoginModal";

export default function LoginModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  return (
    <>
      <Button leftIcon={<LogIn />} onClick={() => setIsOpen(true)}>
        {t("login")}
      </Button>
      <LoginModal onClose={() => setIsOpen(false)} isOpen={isOpen} />
    </>
  );
}
