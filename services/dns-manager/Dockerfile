FROM node:10.15-alpine

RUN mkdir -p /usr/local/src/dns-manager
WORKDIR /usr/local/src/dns-manager

COPY . .
RUN npm ci

EXPOSE 3000/tcp

CMD npm start
