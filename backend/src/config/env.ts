import dotenv from "dotenv";

dotenv.config();

const required = (name: string): string => {
    const v = process.env[name];

    if(!v) throw new Error(`Missing env var: ${name}`);
    return v;
} 

export const env = {
    PORT: Number(process.env.PORT ?? "3000"),
    DATABASE_URL: required("DATABASE_URL")
};
