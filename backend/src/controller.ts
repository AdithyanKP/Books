import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import validateBody from "./validations/index.js";

const prisma = new PrismaClient();

export const addBooks = async (req: Request, res: Response) => {
  await validateBody(req.body, "addBookSchema");

  let data = {
    name: req.body.name,
    description: req.body.description,
    publish_date: req.body.publish_date,
    price: req.body.price,
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
      FROM books as b
      WHERE  c.name ILIKE ${searchValue}
       OR c.description ILIKE ${searchValue}
  ) as subquery;
  `;

  const booksInfo = await prisma.$queryRaw`
      SELECT 
      *
      FROM books as c
      WHERE c.name ILIKE ${searchValue}
      OR c.description ILIKE ${searchValue}
      LIMIT ${limit} 
      OFFSET ${offset};`;

  res.status(200).json({
    data: booksInfo,
    count: booksCount,
    message: "Books retirved successfully",
  });
};
