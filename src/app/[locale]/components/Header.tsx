"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import LanguageSwitcher from "./LanguageSwitcher";
import LoginModalButton from "./Login/LoginModalButton";
import ProfileDropdown from "./ProfileDropdown";

interface Props {
  session: boolean;
}

export default function Header({ session }: Props) {
  return (
    <header>
      <div className="container px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="rounded-xl">
            <Image src="/images/logo.png" width={152} height={48} priority alt="logo" />
          </Link>
          <div className="flex items-center gap-3">
            {session && <div className="text-sm py-[9px] px-[15px] border rounded-xl">+998 90 123 45 67</div>}
            <LanguageSwitcher />
            {session ? <ProfileDropdown /> : <LoginModalButton />}
          </div>
        </div>
      </div>
    </header>
  );
}
