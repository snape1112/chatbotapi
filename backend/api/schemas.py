from pydantic import BaseModel
from typing import List


class CreateNewJSONFileSchema(BaseModel):
    filename: str
    foldername: str
class AddNewTagSchema(BaseModel):
    tag: str
    patterns: List[str]
    responses: List[str]
    context : List[str]

    filepath: str

class EditFileSchema(BaseModel):
    edited_tag : str
    old_tag : str

    filepath: str

class GetSingleJsonFileSchema(BaseModel):

    filepath: str


