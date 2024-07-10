import { Router } from 'express';
import { addBooks, listBooks } from './controller.js';
const router = Router();
router.post('/add-books', addBooks);
router.post('/list-books', listBooks);
export default router;
