#! /usr/bin/sh

// This shell script prompts the user to select whether they want to install dependencies for a
// production environment or a development environment.
read -p "Install dependencies for, 'prod' or 'dev' - " env

if [[ "$env" == "prod" ]]; then
    echo "Installing dependencies from production.txt..."
    pip install -r production.txt
else
    echo "Installing dependencies from requirements.txt..."
    pip install -r requirements.txt
fi

if ! command -v ngrok &> /dev/null
then
    echo "ngrok could not be found, installing ngrok..."
    curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok
fi