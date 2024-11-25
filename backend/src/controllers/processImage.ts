import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

export const predictImage = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).send('Nenhuma imagem foi enviada.');
        return;
    }

    const filePath = path.resolve(req.file.path);

    try {
        // Enviar a imagem para o backend Python FastAPI
        const response = await axios.post('http://127.0.0.1:8000/predict', fs.createReadStream(filePath), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Erro ao processar a imagem:', error);
        res.status(500).send('Erro ao processar a imagem.');
    } finally {
        // Remover o arquivo temporário após a requisição
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Erro ao remover o arquivo:', err);
            }
        });
    }
};
