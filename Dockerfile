FROM node:10-alpine

RUN mkdir -p /home/node/triprun/node_modules && chown -R node:node /home/node/triprun
WORKDIR /home/node/triprun

COPY package*.json ./
COPY .env ./.env
COPY nest-selfsigned.key ./nest-selfsigned.key
COPY nest-selfsigned.crt ./nest-selfsigned.crt

USER node

RUN npm install

COPY --chown=node:node . .

RUN export DATABASE_URL=postgres://postgres:qwer1234ty56@postgres:5432/triprun
RUN npx sequelize-cli db:migrate

EXPOSE 3030
EXPOSE 3031

CMD [ "npm", "run", "start:dev" ]
