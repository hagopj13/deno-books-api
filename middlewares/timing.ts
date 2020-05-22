import { Middleware } from "https://deno.land/x/oak/mod.ts";

const timingMiddleware: Middleware = async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
};

export default timingMiddleware;
