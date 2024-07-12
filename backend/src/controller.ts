import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import validateBody from "./validations/index.js";
import moment from "moment";

const prisma = new PrismaClient();

export const addBooks = async (req: Request, res: Response) => {
  await validateBody(req.body, "addBookSchema");
  let publishDate = moment(req.body.published);
  let isoDate = publishDate.toISOString();

  let data = {
    name: req.body.name,
    description: req.body.description,
    publish_date: isoDate,
    price: parseInt(req.body.price),
  };

  const newBook = await prisma.books.create({
    data: data,
  });

  res.status(200).json({ data: newBook, message: "Book added successfully" });
};

export const listBooks = async (req: Request, res: Response) => {
  await validateBody(req.body, "listBookSchema");
  const offset = (req.body.page_number - 1) * req.body.limit;
  const limit = req.body.limit;
  const search = req.body.search;

  let searchValue = `%${search}%`;

  const booksCount = await prisma.$queryRaw`SELECT COUNT(*) as total FROM (
      SELECT 
      *
      FROM "Books" as b
      WHERE b.name ILIKE ${searchValue}
      OR b.description ILIKE ${searchValue}
  ) as subquery;
  `;

  const booksInfo = await prisma.$queryRaw`
      SELECT 
      *
      FROM "Books" as b
      WHERE b.name ILIKE ${searchValue}
      OR b.description ILIKE ${searchValue}
      LIMIT ${limit} 
      OFFSET ${offset};`;

  res.status(200).json({
    data: booksInfo,
    count: booksCount[0]?.total.toString(),
    message: "Books retirved successfully",
  });
};
