#! /usr/bin/sh

sh install.sh
read -p "Enter ngrok authtoken - " authtoken

if [[ -z "$authtoken" ]]; then
    echo "Cannot boot application without ngrok authtoken, try again"
    exit
else
    ngrok config add-authtoken $authtoken
    python main.py & ngrok http 8000
fi
