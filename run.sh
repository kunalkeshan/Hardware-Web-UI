#! /usr/bin/sh
python main.py
echo authtoken
ngrok http 8000 $authtoken 
