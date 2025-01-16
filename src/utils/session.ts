import { cookies } from "next/headers";

export async function getSession() {
  const cookiesObj = await cookies();
  const session = cookiesObj.get("session");

  if (!session) return null;
  return session;
}

export async function clearSession() {
  const cookiesObj = await cookies();
  cookiesObj.delete("session");
}
