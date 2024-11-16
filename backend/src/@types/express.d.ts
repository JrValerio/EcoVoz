import { Request } from 'express';

declare global {
  namespace Express {
    interface Request<
      Body = Record<string, any>, // Tipagem genérica para o body
      Params = Record<string, any>, // Tipagem genérica para os params
    > {
      body: Body;
      params: Params;
    }
  }
}
