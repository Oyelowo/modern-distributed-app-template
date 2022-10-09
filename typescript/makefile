#############
## STANDARD
#############
install:
	npm i
	# npm ci --force

upgrade:
	npm update --save --force --workspaces
	npm update --save --force

sync:
	make install
	# Only cd for this subshell. Dont affect the following after this
	# Typescript needs generated graphql schema from rust code. Keep it up-to-date
	(cd ../rust && make gen)
	npm run generate

dev:
# Example usage: make dev app=web
	make gen
	# Only cd for this subshell. Dont affect the following after this
	# kill -9 $(lsof -ti:3000)
	# pkill node

# Via turbo repo
	npm run dev -- --scope=$(app)
#alternative via npm directly
	# npm run dev -w=$(app) 

format:
	npm run prettier-fix
	npm run lint-fix
	
check:
	npm run lint-check
	npm run prettier-check

test:
	npm run test

test-e2e:
	npm run test-e2e

build:
	npm run build

run:
	npm run start

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