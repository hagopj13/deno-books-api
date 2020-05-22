const env = Deno.env.toObject();

export const PORT = parseInt(env.PORT, 10) || 3000;
export const MONGO_HOST_URL = env.MONGO_HOST_URL || "mongodb://127.0.0.1:27017";
export const MONGO_DB_NAME = env.MONGO_DB_NAME || "books-api";
