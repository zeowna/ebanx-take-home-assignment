FROM node:22-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "start:prod" ]
