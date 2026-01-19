import express from 'express';
import Router from 'express';
const router = Router();
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoCRUD.controller.js';

router.get('/', getAllTodos);

router.post("/", createTodo);

router.post("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
