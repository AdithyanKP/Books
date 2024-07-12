var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
import validateBody from "./validations/index.js";
import moment from "moment";
const prisma = new PrismaClient();
export const addBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield validateBody(req.body, "addBookSchema");
    let publishDate = moment(req.body.published);
    let isoDate = publishDate.toISOString();
    let data = {
        name: req.body.name,
        description: req.body.description,
        publish_date: isoDate,
        price: parseInt(req.body.price),
    };
    const newBook = yield prisma.books.create({
        data: data,
    });
    res.status(200).json({ data: newBook, message: "Book added successfully" });
});
export const listBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield validateBody(req.body, "listBookSchema");
    const offset = (req.body.page_number - 1) * req.body.limit;
    const limit = req.body.limit;
    const search = req.body.search;
    let searchValue = `%${search}%`;
    const booksCount = yield prisma.$queryRaw `SELECT COUNT(*) as total FROM (
      SELECT 
      *
      FROM "Books" as b
      WHERE b.name ILIKE ${searchValue}
      OR b.description ILIKE ${searchValue}
  ) as subquery;
  `;
    const booksInfo = yield prisma.$queryRaw `
      SELECT 
      *
      FROM "Books" as b
      WHERE b.name ILIKE ${searchValue}
      OR b.description ILIKE ${searchValue}
      LIMIT ${limit} 
      OFFSET ${offset};`;
    res.status(200).json({
        data: booksInfo,
        count: (_a = booksCount[0]) === null || _a === void 0 ? void 0 : _a.total.toString(),
        message: "Books retirved successfully",
    });
});
