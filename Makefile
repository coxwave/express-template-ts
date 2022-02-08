clean:
	@rm -rf dist/*
	@rm -rf node_modules

build:
	@rm -rf dist/*
	tsc

start:
	node dist/index

dev:
	tsc -w & nodemon src/index