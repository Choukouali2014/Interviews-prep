import { pool } from '../db/pool';

export type TodoRow = {
    id: number;
    title?: string | undefined;
    completed?: boolean | undefined;
    created_at: Date;
    updated_at: Date;
};


export class TodosRepo {
    async list(): Promise<TodoRow[]>{
        const r = await pool.query<TodoRow>("select * from todos order by id desc limit 200");

        return r.rows;
    }
    async create(title: string): Promise<TodoRow>{
        const r = await pool.query("insert into todos (title) values ($1) returning *", [title]);
        return r.rows[0];
    }
    async get(id: number): Promise<TodoRow | null>{
        const r = await pool.query("select * from todos where id = $1", [id]);
        return r.rows[0] ?? null;
    }
    async update(id: number, patch:Partial<TodoRow>): Promise<TodoRow | null>{
        const fields: string[] = [];
        const values: any[] = [id];

        let idx=2;

        if(patch.title){
            fields.push(`title= $${idx++}`);
            values.push(patch.title);
        }
        if(patch.completed !== undefined){
            fields.push(`completed= $${idx++}`);
            values.push(patch.completed);
        }

        if(fields.length === 0) return this.get(id);

        const sql= `update todos set ${fields.join(", ")} where id =$1 returning *`;
        const r = await pool.query<TodoRow>(sql, values);

        return r.rows[0] ?? null;
    }

    async remove(id: number): Promise<TodoRow | null>{
        const r = await pool.query<TodoRow>("delete from todos where id=$1 returning *", [id]);

        return r.rows[0] ?? null;
    };

}

