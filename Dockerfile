FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy full app source
COPY . .

# RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
