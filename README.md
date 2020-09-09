# Deductions PDS adaptor

## Prerequisites

* Node 12.x

## Set up

Run `npm install` to install all node dependencies.

Create a .env file using the .env.sample file. The `AUTHORIZATION_KEYS` should be a comma-separated list. The app will 
use a fake MHS when `NODE_ENV` is set to `local`.

## Running the tests

Run the tests with `npm test`.

## Start the app locally

Run a development server with `npm run start:local`.

## Start the app in production mode

Compile the code with `npm run build`, and then start the server with `npm start`.
