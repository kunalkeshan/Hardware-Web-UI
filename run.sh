#! /usr/bin/sh

read -p "Insall packages \"y\" for yes and \"n\" for no- " run_install

if [[ "$run_install" == "y" ]]; then
    sh install.sh
fi

read -p "Enter ngrok authtoken - " authtoken

if [[ -z "$authtoken" ]]; then
    echo "Cannot boot application without ngrok authtoken, try again"
    exit
else
    ngrok config add-authtoken $authtoken
    python main.py & ngrok http 8000
fi
