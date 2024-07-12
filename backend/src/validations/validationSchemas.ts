import vine from "@vinejs/vine";

const addBookSchema = vine.object({
  name: vine.string(),
  description: vine.string(),
  published: vine.date(),
  price: vine.number(),
});

const listBookSchema = vine.object({
  page_number: vine.number(),
  limit: vine.number(),
  search: vine.string().nullable().optional(),
});

export default {
  addBookSchema,
  listBookSchema,
};
