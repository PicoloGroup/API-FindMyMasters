# node image
FROM node:14-alpine

# work directory for app
WORKDIR '/app'

# copy package.json and install dependencies
COPY package.json yarn.lock ./
COPY env ./env/
COPY prisma ./prisma/

# install app dependencies
RUN yarn

# build app for production
RUN yarn build

# copy all content to container
COPY . .

EXPOSE 3000

# start app
CMD ["yarn", "start:prod"]