import os

def init():
    """
    The `init()` function creates two directories, "uploads" and "data", if they do not already exist.
    """
    create_paths = ["uploads", "data"]
    for path in create_paths:
        if not os.path.exists(path):
            os.makedirs(path)
            print(path, "directory created\n",)

