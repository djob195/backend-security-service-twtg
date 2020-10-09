FROM node
COPY ./startup.sh /startup.sh
RUN apt-get update
RUN apt-get install -y git

RUN mkdir /root/.ssh/
RUN chmod 0700 /root/.ssh

WORKDIR /usr/src/app
COPY . .

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
RUN ls /bin/sh
RUN chmod +x /startup.sh
ENTRYPOINT sh -c "./startup.sh"
EXPOSE 3000