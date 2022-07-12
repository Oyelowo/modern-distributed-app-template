
install:
	yarn install

gen:
	make install
	# Only cd for this subshell. Dont affect the following after this
	# Typescript needs generated graphql schema from rust code. Keep it up-to-date
	(cd ../rust && make gen)
	yarn workspace @oyelowo/graphql-client generate  
	# npm run generate --workspace=@oyelowo/graphql-client

dev:
	make gen
	# Only cd for this subshell. Dont affect the following after this
	# kill -9 $(lsof -ti:3000)
	# pkill node
	yarn workspace web dev

lint:
	yarn lint

test:
	yarn test

test-e2e:
	yarn test-e2e

build:
	yarn build

run:
	yarn start

build-web-image:
	docker build -f Dockerfile.production --target web  -t oyelowo/web .

deploy:
	docker build -f Dockerfile.production --target web  -t oyelowo/web .
	docker run -p 3000:3000 oyelowo/web 

deploy-web:
	docker build -f Dockerfile.production --target web  -t oyelowo/web .
	docker-slim build --include-path=/app/apps/web/server.js oyelowo/web
	docker run -p 3000:3000 oyelowo/web.slim