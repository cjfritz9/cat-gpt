FROM node:16

WORKDIR /

COPY . .

RUN npm run install-all
RUN npm run client:build

CMD ["npm", "run", "server"]