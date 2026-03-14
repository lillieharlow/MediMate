# MediMate Containerized Application

This guide explains how to run the MediMate application (frontend, backend, and MongoDB) locally using Docker Compose.

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Engine and Docker Compose)
- Git (to clone the repository)

## 1. Clone the Repository
```
git clone <your-repo-url>
cd MediMate
```

## 2. Set Up Environment Files
- Each service (frontend and backend) requires its own `.env` file for runtime configuration.
- Example files are provided as `.env.dev`, `.env.test`, and `.env.prod` in each service directory:
  - `MediMate-Front-End-Web-App/.env.dev`, `.env.test`, `.env.prod`
  - `MediMate-Back-End-Web-App/.env.dev`, `.env.test`, `.env.prod`
- Edit these files as needed for your local setup (API endpoints, secrets, etc.).

- Create a project root `.env` file (in the MediMate root directory) for Docker Compose image versioning and environment tagging:
```
APP_VERSION=1.1.1
ENVIRONMENT=dev
```
**Before running a build for a different environment (dev, test, prod), update the `ENVIRONMENT` and (optionally) `APP_VERSION` values in the root `.env` file to match the environment you want to build.**

## 3. Build and Run the Application
From the project root directory, run the appropriate command for your environment:

- **Development:**
  ```
  docker compose -f docker-compose.dev.yml up --build
  ```
- **Testing:**
  ```
  docker compose -f docker-compose.test.yml up --build
  ```
- **Production:**
  ```
  docker compose -f docker-compose.prod.yml up --build
  ```

This command will:
- Build the frontend, backend, and MongoDB containers
- Start all services and network them together

## 4. Access the Application
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **MongoDB:** localhost:27017 (not directly accessed by users)

## 5. Stopping the Application
To stop all containers, press `Ctrl+C` in the terminal, then run:
```
docker compose -f docker-compose.dev.yml down
```

## 6. Notes
- The root `.env` file is used only for Docker Compose variable substitution (image tags, environment tags, etc.).
- The frontend and backend `.env` files are used for runtime configuration inside their respective containers.
- For production or test environments, use the corresponding compose and `.env` files (e.g., `docker-compose.prod.yml`, `.env.prod`).
- Always update the root `.env` file to match the environment you are building before running Docker Compose.

## 7. Troubleshooting
- Ensure Docker Desktop is running.
- If you change `.env` files or source code, re-run the `up --build` command.
- Check container logs with:
  - `docker compose -f docker-compose.dev.yml logs backend`
  - `docker compose -f docker-compose.dev.yml logs frontend`


