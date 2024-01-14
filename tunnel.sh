// The command `python main.py` is running a Python script called `main.py`. The `&` symbol is used to
// run the command in the background.
python main.py & ngrok http 8000 -host-header="127.0.0.1:8000"