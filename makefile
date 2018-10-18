# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
ifeq ($(OS), Windows_NT)
	tsc := .\node_modules\.bin\tsc
	mocha := .\node_modules\.bin\mocha
else
	tsc := node_modules/.bin/tsc
	mocha := node_modules/.bin/mocha
endif

marked: dev

dev:
	@echo "[INFO] Building for development"
	@$(tsc) --p $(dev)

build:
	@echo "[INFO] Building for production"
	@$(tsc) --p $(build)

run: dev
	@node docs/test.js

tests:
	@echo "[INFO] Testing with Mocha"
ifeq ($(OS), Windows_NT)
	@-setx NODE_ENV test
else
	@-export NODE_ENV=test
endif
	@$(mocha)

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
ifeq ($(OS), Windows_NT)
	@-setx NODE_ENV test
else
	@-export NODE_ENV=test
endif
	@nyc $(mocha)

install:
	@echo "[INFO] Installing Dependences"
	@npm install
	@npm install --only=dev

clean:
ifeq ($(OS), Windows_NT)
	@echo "[INFO] Skipping"
else
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist
	@rm -rf .nyc_output
	@rm -rf coverage
endif

publish: install build
	@echo "[INFO] Publishing package"
	@npm publish --access=public
