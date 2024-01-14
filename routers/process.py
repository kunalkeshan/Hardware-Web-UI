# Process Handler

# Dependencies
from fastapi import APIRouter
from pydantic import BaseModel
import model

router = APIRouter(
    prefix="/process"
)


# The `ProcessImageRequestBody` class is a data model that represents a request body for processing an
# image, containing information about the creation time and source of the image.
class ProcessImageRequestBody(BaseModel):
    created: int
    src: str


# The `ProcessImageResponse` class represents the response of processing an image, containing the
# class name, accuracy, and birad information.
class ProcessImageResponse(BaseModel):
    class_name: str
    accuracy: int
    birad: dict


"""
This function processes an image using a machine learning model and returns the results.

:param requestBody: The requestBody parameter is of type ProcessImageRequestBody, which is the
request body model for the /image endpoint. It contains the data sent in the request body
:type requestBody: ProcessImageRequestBody
:return: The results of processing a single image are being returned.
"""
@router.post('/image', response_model=ProcessImageResponse)
async def process_image(requestBody: ProcessImageRequestBody):
    body = requestBody.dict()
    results = model.process_single_image(image_path=body['src'])
    return results
