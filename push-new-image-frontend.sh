#!/bin/bash
docker-compose build
docker login
docker tag taan-chat-system_frontend:lastest bdockbockd/taan-chat-system_frontend:lastest
docker push bdockbockd/taan-chat-system_frontend:lastest
