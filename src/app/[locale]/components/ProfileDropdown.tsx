import { LogOut, User } from "lucide-react";
import React from "react";
import { useServerAction } from "zsa-react";

import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { appRoutes } from "@/utils/appRoutes";

import { logout } from "./Login/actions";

export default function ProfileDropdown() {
  const { execute, isPending } = useServerAction(logout);

  return (
    <Popover>
      <PopoverTrigger className="flex gap-2 border rounded-xl py-[9px] px-[15px]">
        <User size={20} />
        <span className="text-sm ">Palonchi Pistonchi</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="px-2">
        <div className="w-[180px]">
          <p className="mb-3 font-bold text-base px-2">Harakatlar</p>
          <LinkButton
            href={appRoutes.profile}
            loading={isPending}
            variant="ghost"
            className="w-full cursor-pointer align-center justify-start"
            leftIcon={<User />}
          >
            Profilga o'tish
          </LinkButton>
          <Button
            loading={isPending}
            variant="ghost"
            className="w-full cursor-pointer align-center justify-start"
            onClick={async () => await execute()}
            leftIcon={<LogOut />}
          >
            {isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
