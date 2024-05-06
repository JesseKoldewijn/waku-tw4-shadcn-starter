import * as cookie from "cookie";

import type { Middleware } from "waku/config";

export const themeCookieKey = "waku-jereko-theme";

const cookieMiddleware: Middleware = () => {
  return async (ctx, next) => {
    const cookies = cookie.parse(ctx.req.headers.cookie || "");

    ctx.context.theme = cookies[themeCookieKey] ?? "dark";

    await next();

    ctx.res.headers ||= {};

    let origSetCookie = ctx.res.headers["set-cookie"] || ([] as string[]);

    if (typeof origSetCookie === "string") {
      origSetCookie = [origSetCookie];
    }

    ctx.res.headers["set-cookie"] = [
      ...origSetCookie,
      cookie.serialize(themeCookieKey, String(ctx.context.theme), {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
        sameSite: "lax",
        path: "/",
      }),
    ];
  };
};

export default cookieMiddleware;
