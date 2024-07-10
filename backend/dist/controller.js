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
const prisma = new PrismaClient();
export const addBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   await validateBody(reqBody, "addContactSchema");
    let data = {
        name: req.body.name,
        description: req.body.description,
        publish_date: req.body.publish_date,
        price: req.body.price,
    };
    const newBook = yield prisma.books.create({
        data: data,
    });
    res.status(200).json({ data: newBook, message: "Book added successfully" });
});
export const listBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const { email, name } = req.body;
    //   try {
    //     // const user = await prisma.user.create({
    //     //   data: { email, name },
    //     // });
    //     res.status(201).json(user);
    //   } catch (error) {
    //     res.status(500).json({ error: 'Internal Server Error' });
    //   }
});
