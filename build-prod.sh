#!/bin/bash
docker-compose build
sh push-new-image-frontend.sh
docker stack deploy --compose-file=docker-stack.yml taan_stack
