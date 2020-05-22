import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  createBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook,
} from "./controllers/books.ts";
import requiresBody from "./middlewares/requiresBody.ts";

const router = new Router();

router
  .post("/books", requiresBody, createBook)
  .get("/books/:isbn", getBook)
  .get("/books", getBooks)
  .patch("/books/:isbn", requiresBody, updateBook)
  .delete("/books/:isbn", deleteBook);

export default router;
