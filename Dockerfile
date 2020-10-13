FROM node
COPY ./startup.sh /startup.sh
RUN apt-get update
RUN apt-get install -y git

RUN mkdir /root/.ssh/
RUN chmod 0700 /root/.ssh
COPY ./id_rsa  /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

WORKDIR /usr/src/app
COPY . .
RUN chmod +x /startup.sh
RUN npm install 

ENTRYPOINT sh -c "./startup.sh"
EXPOSE 3000