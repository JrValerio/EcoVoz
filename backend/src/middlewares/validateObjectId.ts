import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

/**
 * Middleware para validar se um ID de parâmetro é um ObjectId válido do MongoDB.
 * Verifica se o ID fornecido na URL é um ObjectId válido.
 * Se o ID for inválido, retorna uma resposta de erro 400 (Bad Request).
 * Caso contrário, chama o próximo middleware na cadeia.
 */
const validateObjectId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;

  // Verifica se o ID é um ObjectId válido usando a função isValid do Mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`[ERROR] ID inválido: ${id}`); // Log do erro no console
    res.status(400).json({ error: 'ID inválido.' }); // Retorna uma resposta de erro
    return; // Interrompe a execução do middleware
  }

  next(); // Chama o próximo middleware ou rota
};

export default validateObjectId;