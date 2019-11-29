FROM node:10.11-alpine

# Set a working directory
WORKDIR /usr/app

ARG ENVIRONMENT
ENV env ${ENVIRONMENT}

RUN echo ${env}

COPY . ./
RUN yarn

# Run the container under "node" user by default
# USER node

CMD yarn start:${env}
