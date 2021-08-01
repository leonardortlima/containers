#!/bin/sh
echo Construindo univem:build

docker build -t univem:build . -f Dockerfile.build

# Semelhante ao docker run, o comando create cria um container,
# mas não o inicializa
docker create --name extract univem:build

# O comando cp é utilizado para copiar dados entre container e host
docker cp extract:/usr/src/app/dist ./dist

docker rm -f extract

echo Construindo univem:latest

docker build --no-cache -t univem:latest . -f Dockerfile.main
