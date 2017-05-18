FROM node:7.10.0-alpine

LABEL name="alpine-nodemon" version="1.11.0" maintainer="me@ckk.im"

WORKDIR /app
VOLUME /app/src

RUN npm install -g nodemon@1.11.0

RUN BUILD_TOOLS="make gcc git g++ openssh-client python" && \
    # Enable node-gyp builds
    apk add --no-cache $BUILD_TOOLS && \
    mkdir -m 700 -p ~/.ssh && \
    # This allows install from all hosts
    echo -e "StrictHostKeyChecking no" >> /etc/ssh/ssh_config

ONBUILD ARG SSH_PRIVATE_KEY=""
ONBUILD ARG NPM_REGISTRY="https://registry.npmjs.org/"
ONBUILD COPY package.json yarn.lock* /app/

ONBUILD ENV NODE_ENV development
ONBUILD ENV NPM_CONFIG_LOGLEVEL warn

ONBUILD RUN info(){ printf '\n  ==> %s...\n' "$*"; } && \
    info 'Adding ssh key' && \
    echo -e "${SSH_PRIVATE_KEY}" > ~/.ssh/id_rsa && \
    chmod 600 ~/.ssh/id_rsa && \
    info 'Setting custom registry' && \
    npm set registry ${NPM_REGISTRY} && \
    info 'Installing node modules' && \
    npm install && \
    mv node_modules node_modules_new

ONBUILD COPY . /app/

ONBUILD RUN \
    rm -rf node_modules && \
    mv node_modules_new node_modules

CMD ["nodemon"]
