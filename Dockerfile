FROM node

WORKDIR /src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node" , "app"]

