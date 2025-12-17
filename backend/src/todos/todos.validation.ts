interface Payload {
  title?: string;
  completed?: boolean | undefined;
}

export const validateCreateTodo = (body: Payload): { title: string } => {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid body");
  }

  if (!body.title) {
    throw new Error("title must be a string");
  }

  const title = body.title.trim();
  if (title.length === 0 || title.length > 200) {
    throw new Error("title must be 1–200 characters");
  }

  return { title };
};

export const validateUpdateTodo = (body: Payload) => {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid body");
  }

  if (!body.title) {
    throw new Error("title must be a string");
  }

  const patch: Payload = {};
  const title = body.title.trim();
  if (title.length === 0 || title.length > 200) {
    throw new Error("title must be 1–200 characters");
  }
  patch.title = title;
  patch.completed = body.completed;

  if (Object.keys(patch).length === 0) {
    throw new Error("No valid fields to update");
  }

  return patch;
};
