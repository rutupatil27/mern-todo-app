import express from 'express';
import Router from 'express';
const router = Router();
import {authenticateToken} from '../middlewares/auth.middleware.js';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoCRUD.controller.js';

router.get('/', authenticateToken, getAllTodos);

router.post("/", authenticateToken, createTodo);

router.put("/:id", authenticateToken, updateTodo);

router.delete("/:id", authenticateToken, deleteTodo);

export default router;
