FROM node:10-alpine

RUN mkdir -p /home/node/triprun/node_modules && chown -R node:node /home/node/triprun
WORKDIR /home/node/triprun

COPY package*.json ./
COPY .env ./.env

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3030

HEALTHCHECK --interval=10s --timeout=2s --start-period=20s CMD node /healthcheck.js

CMD [ "npm", "run", "start:dev" ]
