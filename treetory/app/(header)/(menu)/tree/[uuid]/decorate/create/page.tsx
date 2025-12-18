"use client";

import PageHeading from "@/components/ui/tree/PageHeading";
import CreateOrnamentPage from "./CreateOrnamentPage";

export default function Page() {
  return (
    <div className="bg-light-blue flex h-screen flex-col">
      <PageHeading />
      <CreateOrnamentPage />
    </div>
  );
}
