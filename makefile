# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
ifeq ($(OS), Windows_NT)
	tsc := .\node_modules\.bin\tsc
else
	tsc := node_modules/.bin/tsc
endif
mocha := node_modules/.bin/mocha

marked: run

run: dev
	@node docs/test.js

dev:
	@echo "[INFO] Building for development"
	@$(tsc) --p $(dev)

build:
	@echo "[INFO] Building for production"
	@$(tsc) --p $(build)
	
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

clean:
ifeq ($(OS), Windows_NT)
	@echo "[INFO] Skipping"
else
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist
	@rm -rf .nyc_output
	@rm -rf coverage
endif

publish: install tests clean build
	@echo "[INFO] Publishing package"
	@npm publish --access=public
