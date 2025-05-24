from pydantic import Field

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    pg_url: str = Field(alias="POSTGRES_URL")
    secret_key: str = Field(alias="SECRET_KEY")
    algo: str = "HS256"
    access_exp: int = 60
    openai_key: str = Field("OPENAI_KEY")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


config = Settings()
