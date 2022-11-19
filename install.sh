#! /usr/bin/sh
echo "prod or dev"
read env
if ["$env" = "prod"]; then
    pip install -r production.txt
else
    pip install -r requirements.txt
fi