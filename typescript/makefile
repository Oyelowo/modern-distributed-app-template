gen:
	# Only cd for this subshell. Dont affect the following after this
	(cd ../rust && make gen)
	npm run generate --workspace=@oyelowo/graphql-client
	# npm run generate

dev:
	# Only cd for this subshell. Dont affect the following after this
	npm run dev --workspace=web
	# npm run dev:old --workspace=web

build:
	npm run build

run:
	npm run start

build-web-image:
	docker build -f Dockerfile.prod --target web  -t oyelowo/web .

deploy:
	docker build -f Dockerfile.prod --target web  -t oyelowo/web .
	docker run -p 3000:3000 oyelowo/web 

deploy-web:
	docker build -f Dockerfile.prod --target web  -t oyelowo/web .
	docker-slim build --include-path=/app/apps/web/server.js oyelowo/web
	docker run -p 3000:3000 oyelowo/web.slim