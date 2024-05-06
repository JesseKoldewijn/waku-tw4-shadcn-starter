import type { Middleware } from "waku/config";

export const themeCookieKey = "waku-jereko-theme";

const commonMiddleware: Middleware = () => {
  return async (ctx, next) => {
    const ua = ctx.req.headers["user-agent"];
    const browserMatch = ua?.match(
      /(chrome|safari|firefox|msie|trident|edge)/i,
    );
    const accurateBrowser = browserMatch ? browserMatch[0] : "unknown";

    const url = ctx.req.url.href;
    const origin = ctx.req.url.origin;

    let href = url;

    if (href.startsWith(`${origin}/RSC`)) {
      const newOrigin = href.replace(`${origin}/RSC`, origin);
      // split by extention at the end of the url
      const split = newOrigin.split(".");
      // remove the last element
      split.pop();
      // join the array back
      href = split.join(".");
    }

    ctx.context.ua = ua;
    ctx.context.browser = accurateBrowser;
    ctx.context.url = href;

    await next();
  };
};

export default commonMiddleware;
