declare global {
  namespace Express {
    /**
     * Interface que estende a interface Request do Express para adicionar propriedades personalizadas.
     */
    interface Request {
      /** Corpo da requisição. Pode conter qualquer tipo de dado. */
      body: unknown;
      /** Parâmetros da rota. As chaves são os nomes dos parâmetros e os valores são strings. */
      params: { [key: string]: string };
      /** Parâmetros da query string. As chaves são os nomes dos parâmetros e os valores são strings ou arrays de strings. */
      query: { [key: string]: string | string[] };
      /** Dados do usuário autenticado (opcional). */
      user?: unknown;
    }
  }
}