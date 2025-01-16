import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    timeZone: "Asia/Tashkent",
    messages: (
      await (locale === "uz"
        ? // When using Turbopack, this will enable HMR for `uz`
          import("../../messages/uz.json")
        : import(`../../messages/${locale}.json`))
    ).default,
  };
});
