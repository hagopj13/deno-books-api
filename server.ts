import { Application } from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/x/denv/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";

import { PORT } from "./config/config.ts";
import loggerMiddleware from "./middlewares/logger.ts";
import timingMiddleware from "./middlewares/timing.ts";
import errorMiddleware from "./middlewares/error.ts";
import router from "./router.ts";
import notFoundMiddleware from "./middlewares/notFound.ts";

const app = new Application();

app.use(loggerMiddleware);
app.use(timingMiddleware);
app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFoundMiddleware);

log.info(`Listening on port ${PORT}`);
await app.listen({ port: PORT });
