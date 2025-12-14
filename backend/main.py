from fastapi import FastAPI
from core.config import create_app
from routers.pipeline_router import router as pipeline_router

app: FastAPI = create_app()

@app.get("/")
def root():
    return {"message": "VectorShift Backend API"}

app.include_router(pipeline_router)
