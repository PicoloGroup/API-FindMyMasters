# node image
FROM node:14-alpine

# work directory for app
WORKDIR '/app'

# copy package.json and install dependencies
COPY package.json           yarn.lock ./
COPY env                    ./env/
COPY prisma                 ./prisma/
COPY tsconfig.build.json    ./tsconfig.build.json
COPY tsconfig.json          ./tsconfig.json

# default port for api
EXPOSE 8081

# install app dependencies
RUN yarn

# copy all content to container
COPY . .

# start app
CMD ["sh", "./docker/config/on-container-start.sh"]