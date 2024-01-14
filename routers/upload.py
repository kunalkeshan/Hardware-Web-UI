# Uploads Handler

# Dependencies
from fastapi import APIRouter, UploadFile, File, status, HTTPException
import math
import shutil
import time
import json

router = APIRouter(
    prefix="/upload"
)

"""
The function `upload_image` is a Python route that handles the uploading of image files, checks if
the uploaded file is an image, generates a unique ID for the image, saves the image information in a
JSON file, and saves the image file in a specified directory.

:param image: The `image` parameter is of type `UploadFile` and is used to receive the uploaded
image file. It is decorated with `File(...)` to indicate that it is a file upload
:type image: UploadFile
:param status_code: The `status_code` parameter is used to specify the HTTP status code to be
returned in the response. In this case, it is set to `status.HTTP_201_CREATED`, which indicates that
the request was successful and a new resource has been created
:return: the `image_info` dictionary, which contains the `created` timestamp and the `src` path of
the uploaded image.
"""
@router.post("/image")
async def upload_image(image: UploadFile = File(...), status_code=status.HTTP_201_CREATED):
    image_type = image.content_type.split('/')
    if not "image" in image_type:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Only Image uploads are allowed")
    created = math.ceil(time.time()*1000)
    id = str(created)
    image_info = {
        "created": created,
        "src": "uploads/"+id+"."+image_type[-1]
    }
    image_info_obj = json.dumps(image_info, indent=4)
    with open("data/"+id+".json", "w+") as outfile:
        outfile.write(image_info_obj)
    with open(image_info["src"], "wb+") as buffer:
        shutil.copyfileobj(image.file, buffer)
    return image_info
