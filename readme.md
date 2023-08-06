Stack Documentation

This documentation provides an overview and explanation of the commands to run the stack presented in this repo. The stack includes a server, client, and a database. It also outlines the initial setup and the steps required to run the stack locally and on Docker containers.
Prerequisites

Before proceeding with the stack deployment, make sure the following software is installed on your system:

    Node.js (npm)
    Docker
    Xcode (for Mac users)

Initial Setup

The provided setup is for a hybrid mode where the server and Prisma will run locally due to the lack of support by Prisma for Linux architecture. 
The initial setup includes two start commands, start-a and start-b, which run the stack with different configurations.

- Mode 1
  - run `make start-a`
    - This will run the server with Prisma Client in standalone mode and the rest of the stack on docker containers.

- Mode 2
  - run `make start-b`
    - This will run the whole stack locally and only the DB through docker

---
