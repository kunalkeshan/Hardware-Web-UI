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
