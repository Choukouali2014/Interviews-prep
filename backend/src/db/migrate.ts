import { pool } from './pool';

const migrations: string[] = [
  `
  create table if not exists todos (
    id bigserial primary key,
    title text not null,
    completed boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

  create or replace function set_updated_at()
  returns trigger as $$
  begin
    new.updated_at = now();
    return new;
  end;
  $$ language plpgsql;

  drop trigger if exists trg_todos_updated_at on todos;

  create trigger trg_todos_updated_at
  before update on todos
  for each row execute function set_updated_at();
  `
];

async function main() {
    for(const sql of migrations){
        await pool.query(sql);
    }

    console.log("Migration applied ");
    await pool.end();
}

main().catch(async (e)=>{
    console.error("migration failed ", e);
    await pool.end();

    process.exit(1);
})
