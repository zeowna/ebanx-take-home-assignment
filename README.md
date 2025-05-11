# Take Home assignment from EBANX #

## José Lucas Chociai ##

Project written in Node.js 22 with Nest.js framework.

Technologies used:

1. Typescript;
2. Nest.js;
3. PostgreSQL;
4. Typeorm;
5. Docker and Docker Compose.
6. ngrok to serve into internet

To run the project run the following command:

First run the database migrations
```bash
$ docker compose run --rm rest-api yarn migration:run
```
Then you can start the application normally

```bash
$ docker compose up rest-api
```

Then you'll need to run the DB migrations:


This project lacks unit tests, but passes yours ``automated test suite``
