import random
import json
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from fastapi.templating import Jinja2Templates
from settings import settings
from .schema import PredictSchema
import os
from .botscript import Bot
import models
from dependencies import get_current_user
router = APIRouter()
bot = Bot()

templates = Jinja2Templates(directory="templates")


@router.get('/', response_class=HTMLResponse)
def dashboard(request: Request):

    return templates.TemplateResponse("index-prod.html", context={"request": request})


@router.get('/login', response_class=HTMLResponse)
def dashboard(request: Request):

    return templates.TemplateResponse("index-prod.html", context={"request": request})


@router.get('/list-json-files', response_class=HTMLResponse)
def dashboard(request: Request):

    return templates.TemplateResponse("index-prod.html", context={"request": request})


@router.get('/add-new-json', response_class=HTMLResponse)
def dashboard(request: Request):

    return templates.TemplateResponse("index-prod.html", context={"request": request})


@router.get("/list-trained-models")
def list_trained_models(current_user: models.User = Depends(get_current_user)):

    Trained_Models_Folder = os.path.join(
        settings.ROOT_DIR, "main", "trained_models")

    subfolders = [f.path for f in os.scandir(
        Trained_Models_Folder) if f.is_dir()]

    return subfolders


@router.post("/predict")
def predict_from_model(predict: PredictSchema):
    chatTxt = predict.search_query

    response = bot.predict_from_query(
        predict.folder_path, predict.search_query)

    print(chatTxt)

    return response
