import os
import json
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from typing import List
from api.routes import router as api_router
from auth.routes import router as auth_router
from main.routes import router as main_router
from models import *
from database import init_db
app = FastAPI()
init_db()
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "akademia.net"
]
app.mount("/static", StaticFiles(directory="static"), name="static")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(main_router, prefix="", tags=["Main Chatbot"])
app.include_router(api_router, prefix="/api", tags=["API"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
