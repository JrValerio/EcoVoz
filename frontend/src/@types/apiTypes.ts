/**
 * Interface para os dados de requisição de login.
 */
export interface LoginRequest {
  /** Email do usuário. */
  email: string;
  /** Senha do usuário. */
  password: string;
}

/**
 * Interface para os dados de requisição de registro.
 */
export interface RegisterRequest {
  /** Nome do usuário. */
  name: string;
  /** Email do usuário. */
  email: string;
  /** Senha do usuário. */
  password: string;
}

/**
 * Interface para os dados de resposta da API para usuário.
 */
export interface UserResponse {
  /** ID do usuário. */
  id: string;
  /** Nome do usuário. */
  name: string;
  /** Email do usuário. */
  email: string;
  /** Token de autenticação JWT. */
  token: string;
}