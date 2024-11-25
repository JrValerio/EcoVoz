from fastapi.middleware.cors import CORSMiddleware

# Função para adicionar o middleware CORS ao app
def setup_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Em produção, utilize origens específicas
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
