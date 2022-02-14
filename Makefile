clean:
	@rm -rf dist
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

docs-dev:
	ts-node src/docs.ts

docs-start:
	node dist/docs.js