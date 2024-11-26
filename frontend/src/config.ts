export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://seu-backend-production.com" // URL do backend em produção
    : "http://localhost:4000"; // URL do backend em desenvolvimento
