# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
tsc := node_modules/.bin/tsc
mocha := node_modules/.bin/mocha

.IGNORE: clean-linux

marked: run

run: dev
	@node docs/test.js

dev:
	@echo "[INFO] Building for development"
	@NODE_ENV=development $(tsc) --p $(dev)

build:
	@echo "[INFO] Building for production"
	@NODE_ENV=production $(tsc) --p $(build)
	
tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test $(mocha)

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha)

install:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

install-prod:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true

clean: clean-linux

clean-linux:
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist
	@rm -rf .nyc_output
	@rm -rf coverage

publish: install tests clean build
	@echo "[INFO] Publishing package"
	@npm publish --access=public
