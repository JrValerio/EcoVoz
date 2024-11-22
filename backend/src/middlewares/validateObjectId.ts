import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const validateObjectId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;

  // Verifica se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'ID inválido.' });
    return; // Importante para evitar que `next()` seja chamado
  }

  next(); // Continua para o próximo middleware ou controlador
};

export default validateObjectId;
