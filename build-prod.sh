#!/bin/bash
docker-compose build
docker stack deploy --compose-file=docker-stack.yml taan_stack
