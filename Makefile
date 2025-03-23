install:
	cp -n dev.env .env
	./bin/npm install

run:
	docker compose up -d
	docker exec -it nirvana-server-app-1 npm run prep-db-local

stop:
	docker compose down
