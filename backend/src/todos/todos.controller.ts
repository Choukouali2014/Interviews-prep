import type { Request, Response } from "express";

import { TodosRepo } from "./todos.repo";
import { validateCreateTodo, validateUpdateTodo } from "./todos.validation";
import { title } from "node:process";

const repo = new TodosRepo();

export async function listTodos(_req: Request, res: Response) {
  const todos = await repo.list();
  res.json({ todos });
}

export async function getTodo(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const todo = await repo.get(id);

  if (!todo) return res.status(404).json({ error: "Not Found" });

  return res.json({ todo });
}

export async function createTodo(req: Request, res: Response){
    const body = req.body;
    try{; 
        const {title} = validateCreateTodo({title: req.body.title});
        console.log(title);
        const todo = await repo.create(title);
        return res.json({todo});
    }catch(e: any){
        res.status(400).json({error: e.message});
    }
}

export async function updateTodo(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const patch = validateUpdateTodo({title:req.body.title, completed: req.body.completed});
    const todo = await repo.update(id,{title: patch.title, completed: patch.completed});
    if (!todo) return res.status(404).json({ error: "Not found" });
    res.json({ todo });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function deleteTodo(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const deleted = await repo.remove(id);
  if (!deleted) return res.status(404).json({ error: "Not found" });

  res.json({ deleted });
}