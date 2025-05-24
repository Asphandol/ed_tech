from config import config
from openai import OpenAI

class OpenAIClient:
    def __init__(self):
        self.__api_key = config.openai_key

    def get_client(self):
        return OpenAI(api_key=self.__api_key)