FROM node:15

WORKDIR /app
COPY package.json package.json
RUN npm i
COPY . .

ENTRYPOINT ["npm", "run"]
CMD ["dev"]