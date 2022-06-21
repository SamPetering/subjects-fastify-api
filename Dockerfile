FROM node:14.18.1
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn

COPY . .

CMD ["yarn", "start:prod"]