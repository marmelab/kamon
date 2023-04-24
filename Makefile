.PHONY: help

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

install: ## Install NodeJS dependencies with Yarn 
	yarn install

# CLI
run-cli: ## Run the CLI game with Yarn
	yarn workspace @kamon/cli start

build-cli: ## Build all workspaces
	yarn workspace @kamon/cli build
	
test-cli:
	yarn workspace @kamon/cli test 

test-webapp:
	yarn workspace @kamon/webapp test