# Dockerfile

FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm build

COPY . .

CMD ["npm", "preview"]