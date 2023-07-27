FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

ENV GOOGLE_OAUTH_CLIENTID = 704875523609-mfa81l8f8495vrdner7hfd70l4bav53p.apps.googleusercontent.com
ENV GOOGLE_OAUTH_SECRET = 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
ENV COOKIE_KEY_1 = cats hate cookies
ENV COOKIE_KEY_2 = cats love milk
ENV NODE_ENV = production

EXPOSE 8080

CMD ["npm", "start"]