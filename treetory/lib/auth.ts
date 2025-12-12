export function getUser() {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user-storage");
  return userStr ? JSON.parse(userStr) : null;
}

export function isLoggedIn() {
  return !!getUser();
}

export function isUser(ownerUuid: string) {
  const user = getUser();
  return user ? user.uuid === ownerUuid : false;
}
