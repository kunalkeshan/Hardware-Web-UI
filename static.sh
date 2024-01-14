// The shell script is performing a series of commands:
cd client
yarn run build
rsync -a --delete build/ ../static/
cd ..
git add .
git commit -m "chore: static files updated"
git push origin main