.PHONY: help

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

install: ## Install NodeJS dependencies with Yarn 
	yarn install

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
run-webapp:
	yarn workspace @kamon/webapp start

build-webapp:
	yarn workspace @kamon/webapp build

unit-test-webapp:
	yarn workspace @kamon/webapp test

e2e-test-webapp:
	yarn workspace @kamon/webapp test:e2e

# MOBILE
run-mobileapp: ## Run an android dev server for mobile app	
	yarn workspace @kamon/mobileapp start

# ADMIN
dev-admin:
	yarn workspace @kamon/admin dev

build-admin:
	yarn workspace @kamon/admin build

test-admin:
	yarn workspace @kamon/admin test
