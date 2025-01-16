"use client";

import React, { ReactNode } from "react";

import ProgressBarProvider from "./ProgressBarProvider";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <>
      <ProgressBarProvider />
      {children}
    </>
  );
}
