declare global {
  namespace Express {
    interface Request<
      Body = Record<string, unknown>,
      Params = Record<string, unknown>,
      Query = Record<string, string | number | boolean>
    > {
      body: Body;
      params: Params;
      query: Query;
    }
  }
}

