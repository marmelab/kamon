#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE ROLE $POSTGREST_ROLE NOLOGIN;
  GRANT USAGE ON SCHEMA public TO $POSTGREST_ROLE;
  CREATE ROLE $POSTGREST_USER NOINHERIT LOGIN PASSWORD '$POSTGREST_PASSWORD';
  GRANT $POSTGREST_ROLE TO $POSTGREST_USER;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO $POSTGREST_ROLE;
EOSQL