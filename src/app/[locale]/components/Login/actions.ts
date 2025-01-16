"use server";

import { redirect } from "next/navigation";
import { createServerAction } from "zsa";

import { authApiRoutes } from "@/utils/apiRoutes";
import { baseProcedure } from "@/utils/procedures";
import { clearSession } from "@/utils/session";

import { LoginConfirmSchema, LoginSchema } from "../../schema";

export const login = createServerAction()
  .input(LoginSchema)
  .handler(async ({ input }) => {
    const response = await fetch(`${process.env.NEXT_BASE_URL}${authApiRoutes.login}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: input.phone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData.error_message;
    }

    return await response.json();
  });

export const loginConfirm = baseProcedure
  .createServerAction()
  .input(LoginConfirmSchema)
  .handler(async ({ input }) => {
    const response = await fetch(`${process.env.NEXT_BASE_URL}${authApiRoutes.loginConfirm}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: Number(input.otp),
        fcm_token: "",
        phone: input.phone,
        platform_id: "",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData.error_message;
    }

    const res = await response.json();

    return res;

    // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week

    // cookies.set("session", res.access_token, {
    //   httpOnly: true,
    //   secure: true,
    //   expires: expiresAt,
    // });

    // redirect("/");
  });

export const logout = createServerAction().handler(async () => {
  await clearSession();
  redirect("/");
});
