import express, { Application, Request, Response } from "express";
import { pool } from "./db/pool";
import { error } from "node:console";

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.get("/todos", async (_req: Request, res: Response) => {
  const r = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  return res.json({ todos: r.rows });
});

app.get("/todos/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const r = await pool.query("select * from todos where id=$1", [id]);

  if (r.rows.length === 0) {
    return res.status(404).json({ error: "Not Found" });
  }

  return res.json({ todo: r.rows[0] });
});

app.post("/todos", async (req: Request, res: Response) => {
  const { title } = req.body ?? {};

  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "title is required" });
  }

  const r = await pool.query(
    "INSERT INTO todos (title) values ($1) Returning *",
    [title.trim()]
  );
  res.status(201).json({ todo: r.rows[0] });
});

app.patch("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const fields: string[] = [];
  const values: any[] = [id];

  let idx = 2;

  if ("title" in req.body) {
    if (typeof req.body.title !== "string") {
      return res.status(400).json({ error: "title must be a string" });
    }
    fields.push(`title = $${idx++}`);
    values.push(req.body.title.trim());
  }

  if ("completed" in req.body) {
    if (typeof req.body.completed !== "boolean") {
      return res.status(400).json({ error: "completed must be boolean" });
    }
    fields.push(`completed = $${idx++}`);
    values.push(req.body.completed);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }
  const sql = `
      UPDATE todos
      SET ${fields.join(", ")}
      WHERE id = $1
      RETURNING *
    `;

  const result = await pool.query(sql, values);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({ todo: result.rows[0] });
});

app.delete("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const result = await pool.query(
    "DELETE FROM todos WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({ deleted: result.rows[0] });
});

app.listen(PORT, () => {
  console.log(`Your server is running on http:localhost:${PORT}`);
});
