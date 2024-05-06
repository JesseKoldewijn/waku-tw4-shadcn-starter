import type { Middleware } from "waku/config";

export const themeCookieKey = "waku-jereko-theme";

const cookieMiddleware: Middleware = () => {
  return async (ctx, next) => {
    const theme = ctx.context.theme;

    await next();

    ctx.res.headers ||= {};

    const isDocument = ctx.res.headers["content-type"]?.includes("text/html");
    const lang = "en-US";

    if (isDocument) {
      const documentContent = ctx.res.body;

      const newDocumentContent = documentContent?.pipeThrough(
        new TransformStream({
          async transform(chunk, controller) {
            const text = new TextDecoder().decode(chunk);
            const newText = text.replace(
              "<html>",
              `<html lang="${lang}" ${theme == "dark" ? "class='dark'" : ""}>`,
            );

            controller.enqueue(new TextEncoder().encode(newText));
          },
        }),
      );

      ctx.res.body = newDocumentContent!;
    }
  };
};

export default cookieMiddleware;
