#!/bin/sh

# deploy migration to prod environment
yarn migrate:deploy:prod

# production build
yarn build

# production serve
yarn start:prod