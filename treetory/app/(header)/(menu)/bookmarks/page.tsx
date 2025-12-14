"use client";

import { Suspense } from "react";
import BookmarksPage from "@/app/(header)/(menu)/bookmarks/BookmarksPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BookmarksPage />
    </Suspense>
  );
}
