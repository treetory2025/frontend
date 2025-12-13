"use client";

import { Suspense } from "react";
import BookmarksPage from "./BookmarksPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BookmarksPage />
    </Suspense>
  );
}
