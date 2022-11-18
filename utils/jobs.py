import math
import time
import os
import json
from threading import Thread

ONE_DAY=60*60*24*1000
FIVE_MIN=60*5
# ONE_DAY=1

def delete_old_uploads():
    while True:
        now = math.ceil(time.time()*1000)
        for file in os.listdir('data'):
            created = int(file.split(".")[0])
            if (now - created) > ONE_DAY:
                file_data = open('data/'+file)
                data = json.load(file_data)
                if os.path.exists(data["src"]):
                    os.remove(data["src"])
                file_data.close()
                os.remove('data/'+file)
        time.sleep(FIVE_MIN)

def all_jobs():
    delete_old_uploads()

def init():
    daemon = Thread(target=all_jobs, daemon=True, name="Run background jobs")
    daemon.start()