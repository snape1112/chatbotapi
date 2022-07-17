from pydantic import BaseModel


class PredictSchema(BaseModel):
    folder_path : str
    search_query : str