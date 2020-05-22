import { Middleware, Status } from "https://deno.land/x/oak/mod.ts";

const notFoundMiddleware: Middleware = async (context) => {
  context.throw(Status.NotFound, "API not found");
};

export default notFoundMiddleware;
