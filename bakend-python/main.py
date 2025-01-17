from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from db import engine
import posts
import authRoute 
import usersRoute

app = FastAPI()

origins = [
    "http://localhost:5173",  
]

# Ajout du middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,  
    allow_methods=["*"],  
    allow_headers=["*"], 
)

# Création des tables dans la base de données (si elles n'existent pas déjà)
models.Base.metadata.create_all(bind=engine)



# Inclusion des routes définies dans posts.router
app.include_router(posts.router)
app.include_router(authRoute.router)
app.include_router(usersRoute.router)
