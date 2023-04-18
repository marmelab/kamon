.PHONY: help install run

ifneq ($(MAKECMDGOALS), help)
	# https://dev.to/lithictech/makefile-and-dotenv-3361
endif

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

install: ## Install NodeJS dependencies with Yarn 
	yarn install

run: ## Run the game with Yarn
	yarn start

volta_install: ## Install NodeJS dependencies with Volta and Yarn 
	volta run yarn install

volta_run: ## Run the game with Volta and Yarn
	volta run yarn start