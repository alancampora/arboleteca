#!/bin/bash

#echo "Stopping applications..."
pm2 stop arboloteca-be || true
pm2 stop arboloteca-fe || true

#echo "Delete applications..."
pm2 delete arboloteca-be || true
pm2 delete arboloteca-fe || true

echo "Building backend..."
cd server
npm install
npm run build
pm2 start "npm run start" --name arboloteca-be
cd ..

echo "Building frontend..."
cd client
npm install
npm run preview --host
pm2 start "npm run preview --host" --name arboloteca-fe
cd ..
