FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./


RUN npm install --omit=dev

COPY . .

EXPOSE 8080

CMD ["npm", "start"]