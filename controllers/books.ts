import { RouterMiddleware, Status } from "https://deno.land/x/oak/mod.ts";

import db from "../config/db.ts";

const books = db.database.collection("books");

export const createBook: RouterMiddleware = async (context) => {
  const body = await context.request.body();
  const { isbn, author, title } = body.value;
  if (!isbn || !author || !title) {
    context.throw(
      Status.BadRequest,
      "Incorrect book data. ISBN, title, and author are all required",
    );
  }
  const count = await books.count({ isbn });
  if (count > 0) {
    context.throw(Status.BadRequest, "A book with that isbn already exists");
  }

  const _id = await books.insertOne(body.value);
  context.response.status = Status.Created;
  context.response.body = { _id, ...body.value };
};

export const getBook: RouterMiddleware = async (context) => {
  const { isbn } = context.params;
  const book = await books.findOne({ isbn });
  if (!book) {
    context.throw(Status.NotFound, "Book not found");
  }
  context.response.status = Status.OK;
  context.response.body = book;
};

export const getBooks: RouterMiddleware = async (context) => {
  context.response.status = Status.OK;
  context.response.body = await books.find();
};

export const updateBook: RouterMiddleware = async (context) => {
  const { isbn } = context.params;
  const body = await context.request.body();
  const updates = Object.keys(body.value);
  const allowedUpdates = ["author", "title"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    context.throw(Status.BadRequest, "Invalid operation");
  }

  const { matchedCount } = await books.updateOne(
    { isbn },
    { $set: body.value },
  );
  if (matchedCount === 0) {
    context.throw(Status.NotFound, "Book not found");
  }
  context.response.status = Status.NoContent;
};

export const deleteBook: RouterMiddleware = async (context) => {
  const { isbn } = context.params;
  const deleteCount = await books.deleteOne({ isbn });
  if (deleteCount === 0) {
    context.throw(Status.NotFound, "Book not found");
  }
  context.response.status = Status.NoContent;
};
