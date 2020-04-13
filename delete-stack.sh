#!/bin/bash
docker stack rm taan_stack
docker image rmi $(docker images -aq) -f
