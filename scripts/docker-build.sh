#!/bin/bash

# Docker build script for DevOps Portfolio
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="devops-portfolio"
TAG=${1:-latest}
REGISTRY=${2:-""}

echo -e "${BLUE}🐳 Building DevOps Portfolio Docker Image${NC}"
echo -e "${YELLOW}Image: ${IMAGE_NAME}:${TAG}${NC}"

# Build the image
echo -e "${BLUE}📦 Building Docker image...${NC}"
docker build --no-cache -t ${IMAGE_NAME}:${TAG} .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

# Tag for registry if provided
if [ ! -z "$REGISTRY" ]; then
    echo -e "${BLUE}🏷️  Tagging for registry: ${REGISTRY}${NC}"
    docker tag ${IMAGE_NAME}:${TAG} ${REGISTRY}/${IMAGE_NAME}:${TAG}
    
    echo -e "${YELLOW}To push to registry, run:${NC}"
    echo -e "${BLUE}docker push ${REGISTRY}/${IMAGE_NAME}:${TAG}${NC}"
fi

# Show image info
echo -e "${GREEN}📊 Image Information:${NC}"
docker images ${IMAGE_NAME}:${TAG}

echo -e "${GREEN}🚀 To run the container:${NC}"
echo -e "${BLUE}docker run -p 3000:80 ${IMAGE_NAME}:${TAG}${NC}"
echo -e "${BLUE}or use: docker-compose up${NC}"

echo -e "${GREEN}✨ Build complete!${NC}"
