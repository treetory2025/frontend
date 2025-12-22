"use client";

import { useState } from "react";
import PageHeading from "@/components/commons/PageHeading";
import DecoratePage from "./DecoratePage";

export default function Page() {
  return (
    <div className="bg-light-blue flex h-full flex-col overflow-y-auto">
      <PageHeading title="장식하기" />
      <DecoratePage />
    </div>
  );
}
