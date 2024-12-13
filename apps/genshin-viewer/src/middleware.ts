import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    `/(zh-CN|zh-TW|de|en|es|fr|id|it|ja|ko|pt|ru|th|tr|vi)/:path*`,
  ],
};
