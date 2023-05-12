# Get started

As explain in the [PostgREST tutorial](https://postgrest.org/en/stable/tutorials/tut0.html)

Connect to the container
`docker container exec -it postgres_kamon bash`

Connect to the DB to create new users
`docker container exec -it postgres_kamon psql -U postgres-kamon -d kamon_db`

Create new user

```sh
create role web_anon nologin;

grant usage on schema public to web_anon;
grant select on public.user to web_anon;

create role authenticator noinherit login password 'password';
```
