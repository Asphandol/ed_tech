from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get('/')
def health_checker():
    return JSONResponse(status_code=200, content={"message":"success"})

