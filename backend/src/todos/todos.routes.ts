import { Router } from "express";

import { listTodos, getTodo, createTodo, updateTodo, deleteTodo } from "./todos.controller";

export const todosRouter = Router();

todosRouter.get("/", listTodos);
todosRouter.get("/:id", getTodo);
todosRouter.post("/", createTodo);
todosRouter.patch("/:id", updateTodo);
todosRouter.delete("/:id", deleteTodo);