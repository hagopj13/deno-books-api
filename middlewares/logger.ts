import { Middleware } from "https://deno.land/x/oak/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";

const loggerMiddleware: Middleware = async ({ request, response }, next) => {
  await next();
  const logMethod = response.status && response.status >= 400
    ? log.error
    : log.info;
  const responseTime = response.headers.get("X-Response-Time");
  logMethod(
    `${request.method} ${request.url} - ${response.status} - ${responseTime}`,
  );
};

export default loggerMiddleware;
