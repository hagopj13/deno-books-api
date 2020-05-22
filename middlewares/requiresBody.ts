import { RouterMiddleware, Status } from "https://deno.land/x/oak/mod.ts";

const requiresBody: RouterMiddleware = async (context, next) => {
  if (!context.request.hasBody) {
    context.throw(Status.BadRequest, "Request body is required");
  }
  const body = await context.request.body();
  if (body.type !== "json") {
    context.throw(Status.UnsupportedMediaType, "Content type must be JSON");
  }
  if (Object.keys(body.value).length === 0) {
    context.throw(Status.BadRequest, "Request body should not be empty");
  }
  await next();
};

export default requiresBody;
