FROM node:12


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm rebuild bcrypt --build-from-source

EXPOSE 8082
CMD [ "node", "dist/src/main"]