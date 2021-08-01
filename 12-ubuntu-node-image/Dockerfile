FROM ubuntu:20.04

RUN \
    apt-get update && \
    apt-get --no-install-recommends install -y \
        ca-certificates \
        wget && \
    wget https://nodejs.org/dist/v14.16.0/node-v14.16.0-linux-x64.tar.gz -O /tmp/node.tar.gz && \
    tar -C /usr/local --strip-components 1 -xzf /tmp/node.tar.gz && \
    npm install -g npm && \
    apt-get clean && \
    rm -rf \
        /var/lib/apt/lists/* \
        /tmp/* \
        /var/tmp/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 8080

ENTRYPOINT [ "node", "index.js" ]
