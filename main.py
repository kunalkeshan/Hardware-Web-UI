# App Entry

# Dependencies
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.templating import Jinja2Templates
from routers import upload, process
from utils import createdirs, jobs
import uvicorn
import os
import sys
from fastapi.logger import logger
from pydantic import BaseSettings
from dotenv import load_dotenv
from pyngrok import ngrok, conf, installer
import ssl

load_dotenv()


# Initialization Functions
createdirs.init()
jobs.init()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    upload.router,
    prefix="/api"
)
app.include_router(
    process.router,
    prefix="/api"
)


@app.get('/ping')
def pong(status_code=200):
    return 'pong'


app.mount("/uploads", StaticFiles(directory="uploads", html=False), name="uploads")
app.mount("/", StaticFiles(directory="static", html=True), name="static")


class Settings(BaseSettings):
    USE_NGROK = os.environ.get("USE_NGROK", "False") == "True"
    PORT = int(os.environ.get('PORT', 8000))
    HOST = os.environ.get("HOST", "127.0.0.1")
    BASE_URL = "http://"+HOST+":"+str(PORT)
    ENVIRONMENT = os.environ.get("ENVIRONMENT", "Development")
    NGROK_AUTH_TOKEN = os.environ.get("NGROK_AUTH_TOKEN", "")


settings = Settings()


def init_webhooks(base_url):
    # Update inbound traffic via APIs to use the public-facing ngrok URL
    pass


if settings.USE_NGROK:

    if len(ngrok.get_tunnels()) > 0:
        for ngrok_tunnel in ngrok.get_tunnels():
            ngrok.disconnect(ngrok_tunnel.public_url)

    pyngrok_config = conf.PyngrokConfig(auth_token=settings.NGROK_AUTH_TOKEN)
    conf.set_default(pyngrok_config)
    pyngrok_config = conf.get_default()

    if not os.path.exists(pyngrok_config.ngrok_path):
        myssl = ssl.create_default_context()
        myssl.check_hostname = False
        myssl.verify_mode = ssl.CERT_NONE
        installer.install_ngrok(pyngrok_config.ngrok_path, context=myssl)

    # Get the dev server port (defaults to 8000 for Uvicorn, can be overridden with `--port`
    # when starting the server
    port = sys.argv[sys.argv.index(
        "--port") + 1] if "--port" in sys.argv else 8000

    # Open a ngrok tunnel to the dev server
    public_url = ngrok.connect(port).public_url
    logger.info(
        "ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))

    # Update any base URLs or webhooks to use the public ngrok URL
    settings.BASE_URL = public_url
    init_webhooks(public_url)
    print(settings.BASE_URL)

if __name__ == "__main__" and settings.ENVIRONMENT == 'Development':
    uvicorn.run("main:app", host=settings.HOST,
                port=settings.PORT, reload=True)


# ngrok_process = ngrok.get_ngrok_process()
# try:
#     # Block until CTRL-C or some other terminating event
#     ngrok_process.proc.wait()
# except KeyboardInterrupt:
#     print(" Shutting down server.")
#     ngrok.kill()
