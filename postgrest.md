# Get started

As explain in the [PostgREST tutorial](https://postgrest.org/en/stable/tutorials/tut0.html)

Connect to the container
`docker container exec -it kamon_postgres bash`

Connect to the DB to create new users
`docker container exec -it kamon_postgres psql -U postgres-kamon -d kamon_db`

Create new user

```sh

psql -U postgres-kamon -d kamon_db

create role web_anon nologin;

grant usage on schema public to web_anon;
grant select on public.user to web_anon;

create role authenticator noinherit login password 'password';

grant web_anon to authenticator;


GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO web_anon;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO web_anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO web_anon;

```
