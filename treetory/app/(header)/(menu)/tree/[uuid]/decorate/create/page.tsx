"use client";

import PageHeading from "@/components/commons/PageHeading";
import CreateOrnamentPage from "./CreateOrnamentPage";

export default function Page() {
  return (
    <div className="bg-light-blue flex flex-col">
      <PageHeading title="장식하기" />
      <CreateOrnamentPage />
    </div>
  );
}
