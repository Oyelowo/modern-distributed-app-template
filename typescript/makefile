#############
## STANDARD
#############
install:
	# npm i
	pnpm i

upgrade:
	pnpm upgrade
	pnpm update

sync:
	make install
	# Only cd for this subshell. Dont affect the following after this
	# Typescript needs generated graphql schema from rust code. Keep it up-to-date
	(cd ../rust && make gen)
	pnpm generate

dev:
# Example usage: make dev app=web
	make gen
	# Only cd for this subshell. Dont affect the following after this
	# kill -9 $(lsof -ti:3000)
	# pkill node

# Via turbo repo
	pnpm dev
#alternative via npm directly
	# pnpm dev -w=$(app) 

format:
	pnpm prettier-fix
	pnpm lint-fix
	
check:
	pnpm lint-check
	pnpm prettier-check

test:
	pnpm test

test-e2e:
	pnpm test-e2e

build:
	pnpm build

run:
	pnpm start

####### OTHERS
build-web-image:
	docker build -f Dockerfile.production --target web  -t oyelowo/web .

deploy:
	docker build -f Dockerfile.production --target web  -t oyelowo/web .
	docker run -p 3000:3000 oyelowo/web 

deploy-web:
	docker build -f Dockerfile.production --target web  -t oyelowo/web .
	docker-slim build --include-path=/app/apps/web/server.js oyelowo/web
	docker run -p 3000:3000 oyelowo/web.slim
