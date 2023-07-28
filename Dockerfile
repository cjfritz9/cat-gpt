FROM node:16-slim

WORKDIR /

COPY package*.json ./
COPY ./server ./server

RUN npm run install-server

CMD ["npm", "run", "server"]