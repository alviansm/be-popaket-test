# REST API for popaket-test

> Author: [alviansm](github.com/alviansm)
<br>

![](https://us-central1-progress-markdown.cloudfunctions.net/progress/80) 

## Tech Stack
- [MongoDB](https://www.mongodb.com/)
- [Expressjs](https://expressjs.com/)
- [Nodejs](https://nodejs.org/en/)

## Project Setup
- `touch .env` in the project directory, or manually create `.env` file. There are 2 variable in this in env: SECRET_KEY and MONGO_URI.
```
MONGO_URI='mongodb://localhost:27017/be-popaket-test'
SECRET_KEY='monkeypopaket-test'
```
MONGO_URI is the URI for the database (MONGO), SECRET_KET is the session secret key
- `npm install` to install the dependencies
- use `nodemon` to get the automatic server reloading
- `npm run start` or use the custom command based in the script from `package.json`
- use ***insomnia*** or ***postman*** to send the request
- go to `localhost:3000` (default url and port) to access the website, and see the available documentation

## My Default API - Endpoint
### Authentication -> METHOD -> Parameter -> Response
- `/auth/signup` -> POST -> takes 4 JSON parameter (username, name, password, msisdn) -> regiter user to the database
- `/auth/login` -> POST -> takes 2 JSON parameter (username, password) -> return jwt
- `/auth/me` -> GET -> jwt -> return private claims

### Logistics -> METHOD -> Parameter -> Response
- `/api/logistics` -> GET -> null -> Index all available logistics options
- `/api/logistics` -> POST -> {logistic_name, amount, destination_name, origin_name, duration} -> register new logistic to the database
- `/api/shipping` -> GET -> {origin_name, destination_name} -> available data based on the parameter

## Additionals
> documentation available at `/docs/` endpoint.