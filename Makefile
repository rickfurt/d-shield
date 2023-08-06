# ------------ INITIAL --------------------------------
# ------------ INIT COMMANDS --------------------------
start-a: compose-down run-stack
# This command will run the stack in a hybrid mode
# Server and prisma will run locally.
# This is due to the lack of support by the ORM
# ( Prisma ) to linux architecture.
# -----------------------------------------------------
# start stack with only the database in a container
start-b: compose-down all
# -----------------------------------------------------

# ------------ CLI SHORTCUTS -------------------------
run-stack: compose-up web only-server
# in case you want to run the stack mostly entirely
# without docker then run: -> make all
# ps: this will also spin up a postgres on a container
all: run-postgres-standalone install init-migrate seed run
# install all dependencies and starts all
# (server | client | seed data)
run-postgres-standalone:
	cd standalone-db && docker-compose up -d
# -----------------------------------------------------
# The command below is to run the server and prisma
# functions only
only-server: install-server init-migrate seed run-server
# -----------------------------------------------------
# install all dependencies ( locally, not docker )
install: install-server install-client
# -----------------------------------------------------
# Install server dependencies
install-server:
	cd server && npm install
# -----------------------------------------------------
# Install client dependencies
install-client:
	cd client && npm install
# -----------------------------------------------------
# Trigger initial migrate command, this will initialise the
# link between the db and the server
init-migrate:
	cd server && npx prisma migrate dev
# -----------------------------------------------------
# Seed the database with random data
seed:
	cd server && npx prisma db seed
# -----------------------------------------------------
# Run the stack on concurrent mode
run:
	@$(MAKE) -j run-server run-client web
run-server:
	cd server && npm run start:dev
run-client:
	cd client && npm run dev
web:
	open -a "Google Chrome" http://localhost:3000/
# -----------------------------------------------------
# Kill the used ports on mac
# Ensure Xcode is installed
kill-ports:
	lsof -t -i tcp:3000,3001,8080| xargs kill
# -----------------------------------------------------
# Build and run docker containers
compose-up:
	docker-compose up --build -d
# -----------------------------------------------------
# Stop all running docker containers
compose-down:
	docker-compose down
	cd standalone-db && docker-compose down
# -----------------------------------------------------