import {
  Middleware,
  isHttpError,
  Status,
} from "https://deno.land/x/oak/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";

const errorMiddleware: Middleware = async (context, next) => {
  try {
    await next();
  } catch (err) {
    log.error(err);
    if (isHttpError(err)) {
      context.response.status = err.status;
      context.response.body = { code: err.status, message: err.message };
    } else {
      context.response.status = Status.InternalServerError;
      context.response.body = {
        code: Status.InternalServerError,
        message: "Internal server error",
      };
    }
  }
};

export default errorMiddleware;
