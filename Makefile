.PHONY: help

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

install: ## Install project dependencies and build internals 
	yarn install build-core build-webapp

build: build-core build-webapp

# CORE
build-core:
	yarn workspace @kamon/core build

test-core: 
	yarn workspace @kamon/core test

# CLI
run-cli: ## Run the CLI game with Yarn
	yarn workspace @kamon/cli start

build-cli: ## Build all workspaces	
	yarn workspace @kamon/cli build
	
test-cli:
	yarn workspace @kamon/cli test 

# WEB APP
migrate:
	yarn workspace @kamon/webapp db:migrate

start-postgres:
	docker-compose -f docker-compose.dev.yml up -d

start-docker:
	docker-compose up -d

run-webapp-dev:
	make start-postgres
	make migrate
	yarn workspace @kamon/webapp start

run-webapp:
	make start-docker
	make migrate

build-webapp:
	yarn workspace @kamon/webapp build

unit-test-webapp:
	yarn workspace @kamon/webapp test

e2e-test-webapp:
	yarn workspace @kamon/webapp test:e2e

# MOBILE
run-mobileapp: run-webapp ## Run an android dev server for mobile app
	touch ./mobileapp/.env
	
	yarn workspace @kamon/mobileapp start
