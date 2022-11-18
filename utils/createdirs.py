import os

def init():
    create_paths = ["uploads", "data"]
    for path in create_paths:
        if not os.path.exists(path):
            os.makedirs(path)
            print(path, "directory created\n",)

