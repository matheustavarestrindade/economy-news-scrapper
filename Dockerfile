FROM node:18-alpine

WORKDIR /app

COPY ./src ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY .env .env
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
RUN npm run build
EXPOSE 3050
ENTRYPOINT [ "npm", "run", "start"]