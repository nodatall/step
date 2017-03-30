#!/bin/bash
# Setup script for STEP's databases

# Add node modules to the path so knex us usable.
export PATH="./node_modules/.bin:$PATH"

echo "Checking for postgres..."
if test ! $(which psql)
then
  echo "Postgres is not installed, installing..."
  brew install postgres
  brew tap homebrew/services
  brew services start postgresql
fi
echo "Dropping database if exists and recreating..."
dropdb step_test ; createdb step_test
dropdb step_development ; createdb step_development
echo "Running knex to build database..."
yarn migrate

echo "Done."
