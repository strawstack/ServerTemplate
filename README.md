# heylisten

A Socket IO App Running on a Google Cloud Platform VM. //

# Making this Repo Easy to Use
1. Instructions to spin up Linode $5 server and seed with public key.
2. Instructions to install two Github Actions:
    1. `Init` Action runs `init.sh` on remote (with Action Secrets) to configures a server from bare metal (only runs its steps if `deploy.sh` not present on server root).
    2. `deploy.sh` Action runs on every push. This action triggers `deploy.sh` script to pull in new code.
3. Instructions to add necessary Actions secrets to Github repo.
4. Every push to the repo will now deploy new code to the server.

# Setup Ubuntu 22 LTS

## Add Pub Key to Server
- ssh-keygen -m PEM -t rsa -b 4096 -C "rhshadowgreen@gmail.com"
- Get `id_rsa.pub` to the server
  - mv ~/id_rsa.pub ~/.ssh/id_rsa.pub
  - touch authorized_keys
  - Copy content of `id_rsa.pub` to `authorized_keys`

## Install Software
- sudo apt-get -y update
- Install NVM
  - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    - export NVM_DIR="$HOME/.nvm"
    - [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    - [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
- nvm install 18 && nvm use 18
- sudo apt-get install -y npm
- sudo apt install git
- sudo apt-get install -y nginx
- sudo npm install -g pm2

## Clone this Repo and Setup Nginx
- Modify subdomain in server-name field in rch.app.conf
  - git clone https://github.com/strawstack/heylisten.git
- sudo rm /etc/nginx/sites-enabled/default
- sudo ln -s ~/heylisten/rch.app.conf /etc/nginx/sites-enabled/rch.app.conf
- sudo service nginx restart

## Install Certbot Certificate
- sudo snap install --classic certbot
- sudo ln -s /snap/bin/certbot /usr/bin/certbot
- sudo certbot --noninteractive --nginx --agree-tos --cert-name rch.app -d socket.rch.app -m rhshadowgreen@gmail.com

## Start Server
- cd ~/heylisten
- pm2 start server.mjs
- pm2 startup
- pm2 save

## Copy Deploy Script to Server Root
- cp ~/heylisten/deploy.sh ~/deploy.sh
- chmod u+x ~/deploy.sh

## Github Action Secrets
- DEPLOY_HOST: socket.rch.app.
- DEPLOY_KEY: private key from generated key pair.
- DEPLOY_USER: root or username.

# Archive

## Automated Startup Scripts
- https://cloud.google.com/compute/docs/instances/startup-scripts/linux

## HTTPS/SSL Certificate Setup
- https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal

## Github Workflow to Push Using SSH to Remote Repo
- https://dev.to/s1hofmann/github-actions-ssh-deploy-setup-l7h
- On push the .github/workflow/deploy command runs and uses rsync to send files to the remote server.

## VM Setup Commands
- Article: https://javascript.plainenglish.io/deploy-a-node-js-server-using-google-cloud-compute-engine-87268919de20

## Server could Pull Repo on Commit
- https://github.com/marketplace/actions/ssh-remote-commands

## Build new server on code push
- Use Github to push new server code to remote.
- pm2 takes args to watch for file changes and restart programs: https://pm2.keymetrics.io/docs/usage/quick-start/

## pm2 restart app on server restart
- https://stackoverflow.com/questions/33638451/pm2-doesnt-launch-my-nodejs-app-after-server-restart

# Add SSH Key to Actions
- https://maxschmitt.me/posts/github-actions-ssh-key


