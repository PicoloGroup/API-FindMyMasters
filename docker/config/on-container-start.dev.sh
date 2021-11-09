#!/bin/sh

# generate migration for local environment
yarn migrate:dev:create

# run migrations in local environment
yarn migrate:dev

# development mode
yarn start:dev