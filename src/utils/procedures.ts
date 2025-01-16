import { cookies as nextCookieKeys, headers as nextHeaders } from "next/headers";
import { createServerActionProcedure } from "zsa";

export async function getContext() {
  const headers = await nextHeaders();
  const cookies = await nextCookieKeys();

  return { cookies, headers };
}

export const baseProcedure = createServerActionProcedure().handler(async () => {
  return getContext();
});
