FROM node:10

ARG BRANCH
ARG BUILD_DATE
ARG COMMIT_HASH

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy full app source
COPY . .

# RUN npm run build

ENV APP_BRANCH=$BRANCH \
    APP_BUILD_DATE=$BUILD_DATE \
    APP_COMMIT_HASH=$COMMIT_HASH

EXPOSE 3000

CMD [ "npm", "start" ]
