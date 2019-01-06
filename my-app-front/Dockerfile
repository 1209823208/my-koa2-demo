#FROM node:8-alpine as builder
#WORKDIR /usr/src/app
#COPY package.json package-lock.json ./
#RUN npm install
#COPY . .
#RUN $(npm bin)/ng build --target=production --environment=prod --aot=false
#
#FROM nginx:1.13.12
#WORKDIR /var/RareCODE-WebApp/
#COPY --from=builder /usr/src/app/dist .
#RUN rm /etc/nginx/conf.d/default.conf
#ADD app.conf /etc/nginx/nginx.conf
#RUN echo "Asia/Shanghai" > /etc/timezone && rm /etc/localtime && dpkg-reconfigure -f noninteractive tzdata
#EXPOSE 80

FROM nginx:1.13.12
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y curl build-essential && curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs && rm -rf /var/lib/apt/lists/*
COPY package.json ./

RUN npm install
COPY . .
#RUN echo $(which npm)
#RUN $(npm bin)/npm run build
RUN npm run build

WORKDIR /var/my-app-front/
RUN cp -r /usr/src/app/build/* . && rm -rf /usr/src/app/
RUN rm /etc/nginx/conf.d/default.conf
ADD app.conf /etc/nginx/nginx.conf
RUN echo "Asia/Shanghai" > /etc/timezone && rm /etc/localtime && dpkg-reconfigure -f noninteractive tzdata
EXPOSE 3000
