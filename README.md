# Take Home assignment from EBANX #

## José Lucas Chociai ##

Project written in Node.js 22 with Nest.js framework.

Technologies used:

1. Typescript;
2. Nest.js;
3. PostgreSQL;
4. Typeorm;
5. Docker and Docker Compose.

to run the project run the following  command:
```bash
$ docker compose up rest-api --build
```

Then you'll need to create the database inside Postgres:
```bash
$ docker compose exec db createdb -U postgres ebanxs-take-home-assignment-development
```

Then you'll need to run the DB migrations:
```bash
$ docker compose run --rm rest-api yarn migration:run
```

This project lacks unit tests, but passes yours ``automated test suite``
