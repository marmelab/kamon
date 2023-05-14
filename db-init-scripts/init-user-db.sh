#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE ROLE web_anon NOLOGIN;
  GRANT USAGE ON SCHEMA public TO web_anon;
  CREATE ROLE authenticator NOINHERIT LOGIN PASSWORD 'password';
  GRANT web_anon TO authenticator;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO web_anon;
EOSQL