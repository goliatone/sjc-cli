#!/bin/bash

sudo -v

sudo -H mkdir -p ~/.sjc/cli
sudo -H rm -rvf ~/.sjc/cli

cd ~/.sjc

git clone https://github.com/stjosephcontent/sjc-cli.git cli

cd cli

sudo -H npm install n -g
sudo -H n latest

sudo -H npm install
sudo -H npm link

echo "ok, i think orchestra is up and running. try 'sjc up'"
