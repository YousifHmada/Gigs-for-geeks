FROM node:latest

RUN mkdir -p /usr/src/server

ADD ./bin/start-express.sh /usr/src
RUN chmod +x /usr/src/start-express.sh

WORKDIR /usr/src/server

CMD [ "/usr/src/start-express.sh" ]