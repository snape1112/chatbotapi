import os
from pydantic import BaseSettings


class Settings(BaseSettings):
    # The default URL expects the app to run using Docker and docker-compose.

    ROOT_DIR = os.path.dirname(os.path.realpath(__file__))

    folder_path_for_root = "D:\\Personal Projects\\Flask Json File Editor\\backend\\main\\trained_models"

    # DATABASE_URI = "mysql+pymysql://root:@localhost/jsonmodifier"
    DATABASE_URI = "mysql+pymysql://root:12345678@localhost/jsonmodifier"
    # DATABASE_URI = 'sqlite:///sqlite.db'
    SECRET_KEY = "hiuy7GUI7yIBUi89yilu6k9U8O7ukFO9hhi76kki8N"

    ALGORITHM = "HS256"

    TOKEN_EXPIRES_AFTER = 60*24  # minutes


settings = Settings()
