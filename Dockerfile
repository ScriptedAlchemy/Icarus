FROM node:10-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN rm -rf .git .idea node_modules
RUN npm install --production
EXPOSE 3319
CMD [ "npm","run", "serve" ]


