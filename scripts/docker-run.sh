#!/bin/bash

# Docker run script for DevOps Portfolio
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="devops-portfolio"
CONTAINER_NAME="devops-portfolio-app"
PORT=${1:-3000}
TAG=${2:-latest}

echo -e "${BLUE}🚀 Running DevOps Portfolio${NC}"

# Stop and remove existing container if it exists
if [ $(docker ps -aq -f name=${CONTAINER_NAME}) ]; then
    echo -e "${YELLOW}🛑 Stopping existing container...${NC}"
    docker stop ${CONTAINER_NAME} >/dev/null 2>&1 || true
    docker rm ${CONTAINER_NAME} >/dev/null 2>&1 || true
fi

# Run the container
echo -e "${BLUE}🐳 Starting container on port ${PORT}...${NC}"
docker run -d \
    --name ${CONTAINER_NAME} \
    -p ${PORT}:80 \
    --restart unless-stopped \
    ${IMAGE_NAME}:${TAG}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Container started successfully!${NC}"
    echo -e "${GREEN}🌐 Portfolio available at: http://localhost:${PORT}${NC}"
    
    # Show container status
    echo -e "${BLUE}📊 Container Status:${NC}"
    docker ps -f name=${CONTAINER_NAME}
    
    # Show logs
    echo -e "${BLUE}📝 Container Logs:${NC}"
    docker logs ${CONTAINER_NAME}
else
    echo -e "${RED}❌ Failed to start container!${NC}"
    exit 1
fi

echo -e "${YELLOW}💡 Useful commands:${NC}"
echo -e "${BLUE}View logs: docker logs -f ${CONTAINER_NAME}${NC}"
echo -e "${BLUE}Stop container: docker stop ${CONTAINER_NAME}${NC}"
echo -e "${BLUE}Remove container: docker rm ${CONTAINER_NAME}${NC}"
