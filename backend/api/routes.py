from ast import pattern
from time import sleep
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from .schemas import *
from settings import settings
from .script import JsonLib
from dependencies import get_current_user
import os
import json
import models
import datetime
import time
router = APIRouter()


@router.get("/")
def home():
    return {"status": "OK"}


@router.post("/add_new_tag")
async def add_new_tag(request: AddNewTagSchema, current_user: models.User = Depends(get_current_user)):

    try:
        data = dict(request)
        filepath = data.get("filepath")

        del data["filepath"]

        script = JsonLib()
        fresh_data = script.add_tag_to_json_file(
            filepath=filepath, new_tag=data)

        return fresh_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/edit_file")
async def edit_file(request: EditFileSchema, current_user: models.User = Depends(get_current_user)):

    try:
        old_tag = request.old_tag
        edited_tag = request.edited_tag
        filepath = request.filepath

        print(old_tag, edited_tag, filepath)

        old_tag = json.loads(old_tag)
        edited_tag = json.loads(edited_tag)
        script = JsonLib()
        current_data = script.read_json_file(filepath)

        for index, item in enumerate(current_data):
            if item['tag'] == old_tag['tag']:
                search_index = index

        current_data[search_index].update(
            {
                "tag": edited_tag['tag'],
                "patterns": edited_tag['patterns'],
                "responses": edited_tag['responses'],
                "context": edited_tag['context']

            }
        )
        script.write_json_file(filepath, current_data)
        return script.read_json_file(filepath)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/list-json-files")
def list_json_files(current_user: models.User = Depends(get_current_user)):

    filelist = []

    for root, dirs, files in os.walk(settings.folder_path_for_root):
        for file in files:
            if ".json" in file:
                filelist.append(os.path.join(root, file))
    return filelist


@router.post("/read-single-json-file")
def read_single_json_file(request: GetSingleJsonFileSchema, current_user: models.User = Depends(get_current_user)):

    script = JsonLib()
    try:
        data = script.read_json_file(request.filepath)
        return data
    except json.decoder.JSONDecodeError as e:
        return str(e)


@router.post("/create-new-json-file")
def create_new_json_file(request: CreateNewJSONFileSchema, current_user: models.User = Depends(get_current_user)):
    script = JsonLib()
    is_folder_created = script.create_new_folder(request.foldername)

    msg = ""
    if is_folder_created:
        msg = "Folder Created, "
    is_file_created = script.create_json_file(
        request.foldername, request.filename)
    if is_file_created:

        msg = msg+"File Created, "

    return msg


def train_model_function(filepath):
    # print(filepath)

    time.sleep(10)
    # directory_path = os.path.dirname(filepath)

    # print(directory_path)

    # files_required = ["chatbotModel.h5", "classesPkl.pkl",
    #                   "model.pkl", "sample.pkl", "wordsPkl.pkl"]

    # for file_required in files_required:

    #     with open(os.path.join(directory_path, file_required), "w") as file:
    #         file.write(str("something"))

    return "Model Trained"


@router.post("/train-model")
def train_model(request: GetSingleJsonFileSchema,  background: BackgroundTasks, current_user: models.User = Depends(get_current_user)):

    background.add_task(train_model_function, request.filepath)

    # script = JsonLib()
    # data = script.read_json_file(request.filepath)
    return "Your model is being trained in the bacground"


# def return_date_created(filepath):
#     c_time = os.path.getctime(filepath)
#     dt_c = datetime.datetime.fromtimestamp(c_time)
#     return dt_c


# @router.post("/single-folder-detail")
# def single_folder_model(request: GetSingleJsonFileSchema):

#     dir_path = os.path.dirname(os.path.realpath(request.filepath))

#     filelist = []

#     for root, dirs, files in os.walk(dir_path):
#         for file in files:
#             if ".h5" in file or ".pkl" in file:
#                 filepath = os.path.join(root, file)
#                 filelist.append({"filepath": filepath, "created_at": return_date_created(filepath)})
#     return filelist
