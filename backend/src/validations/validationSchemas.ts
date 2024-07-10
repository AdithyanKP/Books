import vine from "@vinejs/vine";

const addBook = vine.object({
  name: vine.string(),
  description: vine.string(),
  publish_date: vine.date(),
  price: vine.number(),
});

const listBookSchema = vine.object({
  page_number: vine.number(),
  limit: vine.number(),
  search: vine.string().nullable().optional(),
});

export default {
  addBook,
  listBookSchema,
};
