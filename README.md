# Node.js API with TypeScript and Docker

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This repository contains a Node.js API built with TypeScript and Dockerized for easy deployment. 
The project includes a GitHub Actions workflow for automated testing, building, and pushing Docker images to Docker Hub.

# Article
You can find the article for this repository [Here](https://dev.to/abeinevincent/how-to-dockerise-a-nodejs-typescript-api-a-comprehensive-guide-from-environment-setup-to-deployment-with-a-cicd-pipeline-b40) for a detailed guide.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **TypeScript**: Typed superset of JavaScript that enables better code organization and maintainability.
- **Docker**: Containerization platform for packaging, distributing, and running applications.

## Getting Started

### Prerequisites

Make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Clone the Repository

```bash
git clone https://github.com/Abeinevincent/nodejs_ts_api_with_docker/
```

## Docker Image
Pull the Docker Image
```bash
sudo docker pull abeinevicenthome/node_ts_api_with_docker:latest
```

Build the image

```bash
sudo docker build -t node_ts_api_with_docker:development --target development .
```

Run the docker container

```bash
sudo docker run -p 8800:8800 -v $(pwd):/usr/src/app -e PORT=8800 node_ts_api_with_docker:development
```

Visit http://localhost:8800 in your browser to access the Dockerized API.

## Environment Variables
Ensure to set the following environment variables:

MONGODB_URL: Your MongoDB database connection URL

JWT_EXPIRY_PERIOD: JWT token expiry period

JWT_SEC: JWT secret key for token generation

## GitHub Actions Workflow
The repository includes a GitHub Actions workflow that automates testing and Docker image building on each push to the master branch.

## Contributing
You can contribute by crating an issue or a pull request



1. Fork the repo (<https://github.com/Abeinevincent/nodejs_ts_api_with_docker>)
2. Create your feature branch (`git checkout -b feature/sampleFeature`)
3. Commit your changes (`git commit -m 'Add some sampleFeature'`)
4. Push to the branch (`git push origin feature/sampleFeature`)
5. Create a new Pull Request

## Licence
MIT




