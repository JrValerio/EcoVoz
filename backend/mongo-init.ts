import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Função de inicialização do banco de dados MongoDB.
 */
const initializeDatabase = async (): Promise<void> => {
  // Configurações iniciais utilizando variáveis de ambiente
  const dbName = process.env.MONGO_DB_NAME || 'ecovoz'; // Nome do banco de dados (padrão: 'ecovoz')
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017'; // URI do MongoDB (padrão: localhost)
  const client = new MongoClient(mongoUri);

  try {
    // Conecta ao MongoDB
    await client.connect();
    console.log('✅ Conectado ao MongoDB com sucesso!');

    const db = client.db(dbName);

    console.log(`⚙️ Usando o banco de dados: "${dbName}"`);

    // **1. Criação de coleções**
    const collections = ['users', 'posts', 'comments'];
    for (const collectionName of collections) {
      const existingCollections = await db.listCollections().toArray();
      const collectionExists = existingCollections.some(
        (col) => col.name === collectionName
      );

      if (!collectionExists) {
        await db.createCollection(collectionName);
        console.log(`✅ Coleção "${collectionName}" criada com sucesso.`);
      } else {
        console.log(
          `ℹ️ Coleção "${collectionName}" já existe. Nenhuma ação necessária.`
        );
      }
    }

    // **2. Inserção de Dados Iniciais**
    const initialUsers = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: '$2b$10$EjcS2mY7I9JUEB1m23hs6ueS7wxVvD10FWP6T5X/FCgCrU4D3fj.i', // Hash da senha "admin123"
        role: 'admin',
        createdAt: new Date(),
      },
    ];

    const initialPosts = [
      {
        title: 'Post de Exemplo',
        content: 'Este é um post de exemplo.',
        author: 'Admin User',
        createdAt: new Date(),
      },
    ];

    // Insere dados iniciais na coleção "users", caso esteja vazia
    const usersCollection = db.collection('users');
    const usersCount = await usersCollection.countDocuments();
    if (usersCount === 0) {
      await usersCollection.insertMany(initialUsers);
      console.log('✅ Dados iniciais da coleção "users" inseridos com sucesso.');
    } else {
      console.log(
        'ℹ️ Dados na coleção "users" já existentes. Nenhuma ação necessária.'
      );
    }

    // Insere dados iniciais na coleção "posts", caso esteja vazia
    const postsCollection = db.collection('posts');
    const postsCount = await postsCollection.countDocuments();
    if (postsCount === 0) {
      await postsCollection.insertMany(initialPosts);
      console.log('✅ Dados iniciais da coleção "posts" inseridos com sucesso.');
    } else {
      console.log(
        'ℹ️ Dados na coleção "posts" já existentes. Nenhuma ação necessária.'
      );
    }

    // **3. Configurações Adicionais**
    // Cria índices para otimizar buscas e garantir integridade dos dados
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    console.log(
      '✅ Índice de unicidade criado para o campo "email" na coleção "users".'
    );

    console.log('🚀 Inicialização do MongoDB concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante a inicialização do banco de dados:', error);
  } finally {
    // Encerra a conexão com o MongoDB
    await client.close();
    console.log('🔌 Conexão com o MongoDB encerrada.');
  }
};

// Chama a função de inicialização
initializeDatabase();
