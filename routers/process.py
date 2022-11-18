# Process Handler

# Dependencies
from fastapi import APIRouter
from pydantic import BaseModel
import model

router = APIRouter(
    prefix="/process"
)


class ProcessImageRequestBody(BaseModel):
    created: int
    src: str


class ProcessImageResponse(BaseModel):
    class_name: str
    accuracy: int
    birad: dict


@router.post('/image', response_model=ProcessImageResponse)
async def process_image(requestBody: ProcessImageRequestBody):
    body = requestBody.dict()
    results = model.process_single_image(image_path=body['src'])
    return results
