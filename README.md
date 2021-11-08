<h1 align="center"> 
  Find My Master's API
</h1>

<!-- badges -->
<p align="center">

<!-- language -->
<img src="https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label" alt="TS">
<img src="https://img.shields.io/badge/Nest-v8.1.4-red" alt="Nest: 8.1.4">
<img src="https://img.shields.io/badge/Node-v14.17.3-green" alt="Node: 14.17.3">
<img src="https://img.shields.io/badge/AWS-orange" alt="Node: 14.17.3">
<img src="https://img.shields.io/badge/Docker-blue" alt="Docker: 20.10.8">
<img src="https://img.shields.io/badge/PostgreSQL-yellow" alt="">
<!-- <img src="https://github.com/<OWNER>/<REPOSITORY>/actions/workflows/<WORKFLOW_FILE>/badge.svg" alt="Node: 14.17.3"> -->
	
</p>

![](https://github.com/PicoloGroup/API-FindMyMasters/blob/develop/assets/architecture.jpeg)

## RoadMap

|         Done         |       Task      | Weeks |
|:--------------------:|:---------------:|:-----:|
| <li>[X] :fire: </li> | Postgres on AWS |  1-2  |
| <li>[X] :fire: </li> |   Auth Student  |  3-4  |
| <li>[X] :fire: </li> | Auth University |  5-6  |
| <li>[ ] :fire: </li> |   Feature Find  |  6-7  |
| <li>[ ] :fire: </li> | Feature Explore |  8-9  |
| <li>[ ] :fire: </li> |  Feature Decide | 10-11 |
| <li>[ ] :fire: </li> |  Feature Apply  |   12  |

## Git Commit Message StyleGuide

| Emoji | Raw Emoji Code | Name | Description |
|:---:|:---:|:---:|---|
| :sparkles: | `:sparkles:` | feat: | new feature for the user |
| :ambulance: | `:ambulance:` | fix: | bug fix for the user |
| :books: | `:books:` | docs:  | changes to the documentation |
| :art: | `:art:` | style:  | formatting, missing semi colons, etc; no production code change |
| :tractor: | `:tractor:` | refactor:  | refactoring production code, eg. renaming a variable |
| :microscope: | `:microscope:` | test:  | adding missing tests, refactoring tests; no production code change |
| :hammer: | `:hammer:` | chore:  | updating grunt tasks etc; no production code change |

### Configuration Files

#### [Prisma](https://github.com/prisma/prisma) Configurations

This template uses Postgres by default. If you want to use another database, follow instructions in the [official Nest recipe on Prisma](https://docs.nestjs.com/recipes/prisma).

If you wish to use another database you will also have to edit the connection string on [`prisma/.env`](prisma/.env) file accordingly.

Template includes three different environment options by default. Most of the time you will use the `local`
environment when developing and `production` environment on production. You will need to fill out corresponding
environment files in [`env`](env) directory.

```dosini
DATABASE_HOST=__YOUR_DATABASE_URL__
DATABASE_PORT=5432
DATABASE_USERNAME=__YOUR_USERNAME__
DATABASE_PASSWORD=__YOUR_PASSWORD__
DATABASE_NAME=__YOUR_DATABASE__
```

#### JWT Configurations

A secret key is needed in encryption process. Generate a secret key using a service like [randomkeygen](https://randomkeygen.com/).

Enter your secret key to [`config.ts`](src/config.ts) file. You can also the change expiration time, default is 86400 seconds(1 day).

```js
  jwt: {
    secretOrKey: '__JWT_SECRET_KEY__',
    expiresIn: 86400,
  },
```

#### [NodeMailer✉️](https://github.com/nodemailer/nodemailer) Configurations

A delivery provider is required for sending mails with Nodemailer. I mostly use [SendGrid](https://sendgrid.com) to send mails, however, Nodemailer can work with any service with SMTP transport.

To get a SendGrid API key:

- Create a free account from [https://signup.sendgrid.com/](https://signup.sendgrid.com/)
- Confirm your account via the activation email and login.
- Create an API Key with mail sending capability.

Enter your API key and sender credentials to [`config.ts`](src/config.ts) file. Sender credentials are the sender name and sender mail that will be seen by your users.

```js
mail:
    service: {
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      user: 'apikey',
      pass: '__SENDGRID_API_KEY__',
    },
    senderCredentials: {
      name: '__SENDER_NAME__',
      email: '__SENDER_EMAIL__',
    },
  },
```

#### Mail Template Configurations

Mail templates are highly customizable and heavily depend on configurations. Enter your project's information to [`config.ts`](src/config.ts). Urls are used as references in the templates. If your mail verification logic is independent from your front-end application, you can use API's own mail verification endpoint, e.g. `http://localhost:3000/auth/verify`, as `mailVerificationUrl`. Otherwise, send a HTTP `GET` request to verification endpoint with token added as a parameter named token, e.g, `http://localhost:3000/auth/verify?token=__VERIFICATION_TOKEN__`

```js
 project: {
    name: '__YOUR_PROJECT_NAME__',
    address: '__YOUR_PROJECT_ADDRESS__',
    logoUrl: 'https://__YOUR_PROJECT_LOGO_URL__',
    slogan: 'Made with ❤️ in Istanbul',
    color: '#123456',
    // You can enter as many social links as you want
    socials: [
      ['GitHub', '__Project_GitHub_URL__'],
      ['__Social_Media_1__', '__Social_Media_1_URL__'],
      ['__Social_Media_2__', '__Social_Media_2_URL__'],
    ],
    url: 'http://localhost:4200',
    mailVerificationUrl: 'http://localhost:3000/auth/verify',
    mailChangeUrl: 'http://localhost:3000/auth/change-email',
    resetPasswordUrl: 'http://localhost:4200/reset-password',
    termsOfServiceUrl: 'http://localhost:4200/legal/terms',
  },
```

### Migrations

Please refer to the official [Prisma Migrate Guide](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate) to get more info about Prisma migrations.

```bash
# generate migration for local environment
$ yarn migrate:dev:create
# run migrations in local environment
$ yarn migrate:dev

# deploy migration to prod environment
$ yarn migrate:deploy:prod
```

### Running the app

```bash
# development mode
$ yarn start:dev

# production
$ yarn build
$ yarn start:prod
```

### Running the tests

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
