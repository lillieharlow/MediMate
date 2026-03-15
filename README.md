# MediMate Containerised Application

This guide explains how to run the MediMate application (frontend, backend) locally using Docker Compose.

Detailed README files for each service can be found here:
- [MediMate Frontend](MediMate-Front-End-Web-App/README.md)
- [MediMate Backend](MediMate-Back-End-Web-App/README.md)

## Install Steps for Local Deployent with Docker
- [Prerequisites](#prerequisites)
- [1. Clone the Repository](#1-clone-the-repository)
- [2. Set Up `.env` Files](#2-set-up-env-files)
- [3. Build and Run the Application](#3-build-and-run-the-application)
- [4. Access the Application](#4-access-the-application)
- [5. Stopping the Application](#5-stopping-the-application)
- [6. Notes](#6-notes)
- [7. Troubleshooting](#7-troubleshooting)
- [8. CI/CD Workflow](#8-cicd-workflow)

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Docker Engine and Docker Compose)

## 1. Clone the Repository
```
git clone https://github.com/lillieharlow/MediMate.git
cd MediMate
```

## 2. Set Up `.env` Files
- The project root and each service (frontend and backend) requires its own `.env` file for runtime configuration.
- Example files are provided as `.env.example` in each service directory.
- You must set up a separate `.env` file for each environment (`dev`, `test`, `prod`) for both backend and frontend, using the `.env.example` as a template.

**Note: `ENVIRONMENT` and `APP_VERSION` values in the root `.env` file need to be manually updated to match the environment and version you want to build.**

**How to use the `.env.example` files:**
1. Copy the example file to create your `.env` files for each environment:
   - Backend:
     - `cp MediMate-Back-End-Web-App/.env.example MediMate-Back-End-Web-App/.env.dev`
     - `cp MediMate-Back-End-Web-App/.env.example MediMate-Back-End-Web-App/.env.test`
     - `cp MediMate-Back-End-Web-App/.env.example MediMate-Back-End-Web-App/.env.prod`
   - Frontend:
     - `cp MediMate-Front-End-Web-App/.env.example MediMate-Front-End-Web-App/.env.dev`
     - `cp MediMate-Front-End-Web-App/.env.example MediMate-Front-End-Web-App/.env.test`
     - `cp MediMate-Front-End-Web-App/.env.example MediMate-Front-End-Web-App/.env.prod`
   - Root:
     - `cp .env.example .env`
2. Edit each `.env` file and fill in the required values for your environment.

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

**Note: production frontend is accessible at `http://localhost` (port 80 by default)**

## 5. Stopping the Application
To stop all containers, press `Ctrl+C` in the terminal, then run:
- **Development:**
  ```
  docker compose -f docker-compose.dev.yml down
  ```
- **Testing:**
  ```
  docker compose -f docker-compose.test.yml down
  ```
- **Production:**
  ```
  docker compose -f docker-compose.prod.yml down
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

## 8. CI/CD Workflow
This project uses GitHub Actions for CI/CD. On every push to the main branch:
- Secrets are injected into the backend and frontend `.env.prod` files using GitHub repository secrets.
- Production Docker images are built for both backend and frontend, tagged with the version from their `package.json` files.
- No secrets are ever committed to the repository; they are only present at build time in the CI environment.
- The workflow file is located at `.github/workflows/docker-build.yml`.
