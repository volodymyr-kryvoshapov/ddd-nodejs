dev-env-up:
	docker-compose up --build -d
	sleep 2 # Wait for the PostgreSQL server to start
	docker exec -i postgres_container bash -c "psql -d example -U marcus -f ./db/structure.sql"
	docker exec -i postgres_container bash -c "psql -d example -U marcus -f ./db/data.sql"

dev-env-down:
	docker-compose down -v
