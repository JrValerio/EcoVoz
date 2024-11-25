import multer from 'multer';

// Configura o Multer para armazenar o vídeo em memória
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
