FROM node:6.0.0

ADD ./ /app

WORKDIR /app

RUN npm install

CMD node index.js