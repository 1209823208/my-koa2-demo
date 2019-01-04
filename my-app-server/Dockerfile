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

FROM node
WORKDIR /var/my-app-service/
RUN apt-get update && apt-get install -y curl build-essential mysql-client && \ 
    curl -sL https://deb.nodesource.com/setup_9.x | bash - && \
    apt-get install -y nodejs && rm -rf /var/lib/apt/lists/*

COPY app ./
# COPY run.sh .
# RUN chmod +x ./run.sh
RUN npm install
# RUN echo $(find ./  -name server)

# RUN echo $(find server -name index.js)
EXPOSE 3001
ENTRYPOINT ["npm", "run", "start"]
# ENTRYPOINT ["/var/my-app-service/run.sh"]
