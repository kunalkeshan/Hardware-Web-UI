# App Entry
"""
This is the entry point for a FastAPI application that sets up routes, middleware, and initializes
necessary dependencies.

:param base_url: The `base_url` parameter is the base URL of the application. It is used to
construct the complete URLs for the API endpoints and static files
"""

# This section of code is importing the necessary dependencies for the FastAPI application.
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
# from pyngrok import ngrok, conf, installer
import ssl

# The code `os.environ['TD_CPP_MIN_LOG_LEVEL'] = '2'` sets the environment variable
# `TD_CPP_MIN_LOG_LEVEL` to the value `'2'`. This environment variable is used to control the logging
# level of the TensorFlow library.
os.environ['TD_CPP_MIN_LOG_LEVEL'] = '2'
load_dotenv()


# Initialization Functions
createdirs.init()
jobs.init()

app = FastAPI()

"""
The above code sets up a Python web application with middleware for handling CORS, routers for
different API endpoints, and mounts static files for serving HTML and uploads. It also defines a
Settings class for storing configuration variables and a function for initializing webhooks.

:param base_url: The `base_url` parameter is the base URL of your application. It is used to
construct the complete URL for your API endpoints and webhooks. In the code snippet provided, the
`base_url` is constructed using the `HOST` and `PORT` environment variables
"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# The code `app.include_router(upload.router, prefix="/api")` and `app.include_router(process.router,
# prefix="/api")` are adding routers to the FastAPI application.
app.include_router(
    upload.router,
    prefix="/api"
)
app.include_router(
    process.router,
    prefix="/api"
)


# Health Check Route
"""
The function `pong` returns the string 'pong' when the '/ping' route is accessed.

:param status_code: The status_code parameter is an optional parameter that specifies the HTTP
status code to be returned in the response. By default, it is set to 200, which means the response
will have a status code of 200 OK, defaults to 200 (optional)
:return: The string 'pong' is being returned.
"""
@app.get('/ping')
def pong(status_code=200):
    return 'pong'


# The code `app.mount("/uploads", StaticFiles(directory="uploads", html=False), name="uploads")` is
# mounting the directory "uploads" as a static file directory under the URL path "/uploads". This
# means that any files in the "uploads" directory can be accessed through the URL path "/uploads".
app.mount("/uploads", StaticFiles(directory="uploads", html=False), name="uploads")
app.mount("/", StaticFiles(directory="static", html=True), name="static")


# The class `Settings` defines various settings for a Python application, including whether to use
# ngrok, the port and host to run the application on, the base URL, the environment, and the ngrok
# authentication token.
class Settings(BaseSettings):
    USE_NGROK = os.environ.get("USE_NGROK", "False") == "True"
    PORT = int(os.environ.get('PORT', 8000))
    HOST = os.environ.get("HOST", "127.0.0.1")
    BASE_URL = "http://"+HOST+":"+str(PORT)
    ENVIRONMENT = os.environ.get("ENVIRONMENT", "Development")
    NGROK_AUTH_TOKEN = os.environ.get("NGROK_AUTH_TOKEN", "")


settings = Settings()


def init_webhooks(base_url):
    """
    The function `init_webhooks` is used to update inbound traffic via APIs to use a public-facing ngrok
    URL.
    
    :param base_url: The base URL is the public-facing ngrok URL that will be used to update inbound
    traffic via APIs
    """
    # Update inbound traffic via APIs to use the public-facing ngrok URL
    pass


# The code `if __name__ == "__main__" and settings.ENVIRONMENT == 'Development':` checks if the
# current module is being run as the main module and if the environment is set to 'Development'.
if __name__ == "__main__" and settings.ENVIRONMENT == 'Development':
    uvicorn.run("main:app", host=settings.HOST,
                port=settings.PORT, reload=True)


# -------------------------------------------------------------------- # 
#   NGROK Setup - WIP   #
# -------------------------------------------------------------------- #    

# if settings.USE_NGROK:

#     if len(ngrok.get_tunnels()) > 0:
#         for ngrok_tunnel in ngrok.get_tunnels():
#             ngrok.disconnect(ngrok_tunnel.public_url)

#     pyngrok_config = conf.PyngrokConfig(auth_token=settings.NGROK_AUTH_TOKEN)
#     conf.set_default(pyngrok_config)
#     pyngrok_config = conf.get_default()

#     if not os.path.exists(pyngrok_config.ngrok_path):
#         myssl = ssl.create_default_context()
#         myssl.check_hostname = False
#         myssl.verify_mode = ssl.CERT_NONE
#         installer.install_ngrok(pyngrok_config.ngrok_path, context=myssl)

#     # Get the dev server port (defaults to 8000 for Uvicorn, can be overridden with `--port`
#     # when starting the server
#     port = sys.argv[sys.argv.index(
#         "--port") + 1] if "--port" in sys.argv else 8000

#     # Open a ngrok tunnel to the dev server
#     public_url = ngrok.connect(port).public_url
#     logger.info(
#         "ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))

#     # Update any base URLs or webhooks to use the public ngrok URL
#     settings.BASE_URL = public_url
#     init_webhooks(public_url)
#     print(settings.BASE_URL)

# ngrok_process = ngrok.get_ngrok_process()
# try:
#     # Block until CTRL-C or some other terminating event
#     ngrok_process.proc.wait()
# except KeyboardInterrupt:
#     print(" Shutting down server.")
#     ngrok.kill()
