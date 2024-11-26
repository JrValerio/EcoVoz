import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const initializeDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
  const dbName = process.env.MONGO_DB_NAME || 'ecovoz';

  const client = new MongoClient(mongoUri);

  try {
    // Aguarda a disponibilidade do MongoDB
    await waitForMongo(mongoUri);

    // Conecta ao MongoDB
    await client.connect();
    console.log('✅ Conectado ao MongoDB.');

    const db = client.db(dbName);

    // Criação de coleções
    const collections = ['users', 'posts'];
    await createCollections(db, collections);

    // Inserção de dados iniciais
    const initialUsers = [
      { name: 'Admin User', email: 'admin@example.com', password: 'hashed_password', role: 'admin', createdAt: new Date() },
    ];
    await insertInitialData(db, 'users', initialUsers);

    // Configuração de índices
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('✅ Índice criado para "users".');

    console.log('🚀 Inicialização concluída com sucesso.');
  } catch (error) {
    console.error('❌ Erro ao inicializar o banco de dados:', error);
  } finally {
    await client.close();
    console.log('🔌 Conexão com o MongoDB encerrada.');
  }
};

const waitForMongo = async (uri, retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      console.log('✅ MongoDB está disponível.');
      await client.close();
      return;
    } catch {
      console.log(`🔄 Tentando conexão (${i + 1}/${retries})...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error('❌ MongoDB não está disponível.');
};

// Funções utilitárias para coleções e dados
const createCollections = async (db, collections) => { /* ... */ };
const insertInitialData = async (db, collectionName, data) => { /* ... */ };

initializeDatabase();
