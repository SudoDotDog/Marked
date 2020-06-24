# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
tsc := node_modules/.bin/tsc
ts_node := node_modules/.bin/ts-node
mocha := node_modules/.bin/mocha
eslint := node_modules/.bin/eslint

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
	@NODE_ENV=test \
	$(mocha) --config test/.mocharc.json

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha) --config test/.mocharc.json

lint:
	@echo "[INFO] Linting"
	@NODE_ENV=production \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json

lint-fix:
	@echo "[INFO] Linting and Fixing"
	@NODE_ENV=development \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json --fix

install:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

install-prod:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true

license: clean
	@echo "[INFO] Sign files"
	@NODE_ENV=development $(ts_node) script/license.ts

clean: clean-linux
	@echo "[INFO] Cleaning release files"
	@NODE_ENV=development $(ts_node) script/clean-app.ts

clean-linux:
	@echo "[INFO] Cleaning dist files"
	@rm -rf app
	@rm -rf dist_script
	@rm -rf .nyc_output
	@rm -rf coverage

publish: install tests lint license build
	@echo "[INFO] Publishing package"
	@cd app && npm publish --access=public

publish-dry-run: install tests lint license build
	@echo "[INFO] Publishing package"
	@cd app && npm publish --access=public --dry-run
