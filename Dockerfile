FROM node:18

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY ./package*.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:dev" ]