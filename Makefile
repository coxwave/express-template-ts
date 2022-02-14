clean:
	@rm -rf dist
	@rm -rf public/docs
	@rm -rf node_modules

build:
	@rm -rf dist/*
	tsc

start:
	node dist/index.js

dev:
	tsc -w & nodemon src/index.ts

test:
	jest --config jest.config.js

docs-build:
	@rm -rf public/docs
	apidoc -i src/routes -o docs -t apidoc-template

docs-dev:
	nodemon src/docs.ts

docs-start:
	node dist/docs.js