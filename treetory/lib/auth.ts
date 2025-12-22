import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";

export function getUser() {
  if (typeof window === "undefined") return null;

  const storage = localStorage.getItem("user-storage");
  if (!storage) return null;

  const parsed = JSON.parse(storage);
  return parsed?.state?.user ?? null;
}

export function isLoggedIn() {
  return !!getUser();
}

export function isUser() {
  const user = getUser();
  const { uuid } = useOwner();
  return user ? user.uuid === uuid : false;
}
