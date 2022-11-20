#! /usr/bin/sh
echo "prod or dev"
read env
if ["$env" = "prod"]; then
    pip3 install -r production.txt
else
    pip3 install -r requirements.txt
fi

# curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok