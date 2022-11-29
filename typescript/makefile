#############
## STANDARD
#############
install:
	pnpm install

upgrade:
	pnpm update

sync:
	make install
	# Only cd for this subshell. Dont affect the following after this
	# Typescript needs generated graphql schema from rust code. Keep it up-to-date
	# (cd ../rust && make sync)
	pnpm --filter "*" generate

dev:
# Example usage: make dev app=app-web
	make sync
	# Only cd for this subshell. Dont affect the following after this
	# kill -9 $(lsof -ti:3000)
	# pkill node
	pnpm --filter "*" dev 

format:
	pnpm rome check . --apply-suggested
	pnpm rome format . --write
	
check:
	pnpm rome check .

test:
	pnpm --filter "*" test

test-e2e:
	pnpm --filter "*" test-e2e

build:
	pnpm --filter "*" build

run:
	pnpm --filter "*" start

cleanup:
	rm -rf ~/Library/pnpm/store/v3/files/  
	pnpm store prune 

####### OTHERS
build-app-web-image:
	docker build -f Dockerfile.production --target app-web  -t oyelowo/app-web .

deploy:
	docker build -f Dockerfile.production --target app-web  -t oyelowo/app-web .
	docker run -p 3000:3000 oyelowo/app-web 

deploy-app-web:
	docker build -f Dockerfile.production --target app-web  -t oyelowo/app-web .
	docker-slim build --include-path=/app/apps/app-web/server.js oyelowo/app-web
	docker run -p 3000:3000 oyelowo/app-web.slim
