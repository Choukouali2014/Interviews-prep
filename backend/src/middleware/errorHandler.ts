import type { Request, Response, NextFunction } from 'express';

export function errorHandle(err: unknown, _req: Request, res: Response, _next: NextFunction){
   
    console.error(err);
    return res.status(500).json({erro: "InternalServerError"})
    
}