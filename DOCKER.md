# Docker Deployment Guide

This guide provides detailed instructions for deploying the URL Shortener application using Docker.

## Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)
- A MongoDB instance (MongoDB Atlas or local)

## Environment Setup

### 1. Create Environment File

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
MONGOOSE_URL=mongodb+srv://username:password@cluster.mongodb.net/URL-SHORTNER
```

## Deployment Options

### Option 1: Docker Run (Simple)

Build and run the container manually:

```bash
# Build the image
docker build -t url-shortener:latest .

# Run with environment file
docker run -d \
  --name url-shortener \
  -p 5000:5000 \
  --env-file .env \
  url-shortener:latest

# Run with explicit environment variables
docker run -d \
  --name url-shortener \
  -p 5000:5000 \
  -e PORT=5000 \
  -e MONGOOSE_URL="mongodb+srv://user:pass@cluster.mongodb.net/DB" \
  url-shortener:latest
```

### Option 2: Docker Compose with MongoDB Atlas (Recommended)

Use this if you're using MongoDB Atlas (cloud database):

```bash
# Start the application
docker-compose -f docker-compose.atlas.yml up -d

# View logs
docker-compose -f docker-compose.atlas.yml logs -f app

# Stop the application
docker-compose -f docker-compose.atlas.yml down
```

### Option 3: Docker Compose with Local MongoDB

Use this if you want MongoDB running in a container:

```bash
# Update .env to use local MongoDB
MONGOOSE_URL=mongodb://mongo:27017/url-shortner

# Start both application and MongoDB
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Stop and remove volumes (deletes data)
docker-compose down -v
```

## Docker Commands Reference

### Container Management

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Start container
docker start url-shortener

# Stop container
docker stop url-shortener

# Restart container
docker restart url-shortener

# Remove container
docker rm url-shortener

# Remove container (force)
docker rm -f url-shortener
```

### Logs and Debugging

```bash
# View logs
docker logs url-shortener

# Follow logs (real-time)
docker logs -f url-shortener

# Last 100 lines
docker logs --tail 100 url-shortener

# Enter container shell
docker exec -it url-shortener sh

# Inspect container
docker inspect url-shortener
```

### Image Management

```bash
# List images
docker images

# Remove image
docker rmi url-shortener:latest

# Remove unused images
docker image prune

# Build without cache
docker build --no-cache -t url-shortener:latest .
```

### Docker Compose Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build

# Scale application (run multiple instances)
docker-compose up -d --scale app=3
```

## Health Checks

The container includes health checks that run every 30 seconds:

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' url-shortener

# View health check logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' url-shortener
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Application port | `5000` |
| `MONGOOSE_URL` | MongoDB connection string | `mongodb+srv://...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |

## Troubleshooting

### Container Won't Start

**Check logs:**
```bash
docker logs url-shortener
```

**Common issues:**
- Missing environment variables
- Invalid MongoDB connection string
- Port already in use
- Insufficient permissions

**Solutions:**
```bash
# Check if port is in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Change port in .env
PORT=3000

# Verify environment variables
docker exec url-shortener printenv
```

### MongoDB Connection Failed

**Check connection string:**
```bash
docker exec url-shortener node -e "console.log(process.env.MONGOOSE_URL)"
```

**For MongoDB Atlas:**
- Whitelist Docker host IP address (or use 0.0.0.0/0 for testing)
- Verify database user credentials
- Ensure cluster is running

**For local MongoDB:**
```bash
# Test MongoDB connection
docker exec url-shortener-mongo mongosh --eval "db.adminCommand('ping')"

# Check MongoDB logs
docker logs url-shortener-mongo
```

### High Memory Usage

**Check resource usage:**
```bash
docker stats url-shortener
```

**Set memory limits:**
```bash
docker run -d \
  --name url-shortener \
  --memory="512m" \
  --cpus="1.0" \
  -p 5000:5000 \
  --env-file .env \
  url-shortener:latest
```

### Container Keeps Restarting

**Check restart policy:**
```bash
docker inspect --format='{{.HostConfig.RestartPolicy}}' url-shortener
```

**View last exit code:**
```bash
docker inspect --format='{{.State.ExitCode}}' url-shortener
```

## Production Best Practices

### 1. Use Docker Secrets (Swarm Mode)

```bash
# Create secret
echo "mongodb+srv://..." | docker secret create mongo_url -

# Use in service
docker service create \
  --name url-shortener \
  --secret mongo_url \
  -p 5000:5000 \
  url-shortener:latest
```

### 2. Implement Proper Logging

```bash
# Configure log driver
docker run -d \
  --name url-shortener \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  -p 5000:5000 \
  --env-file .env \
  url-shortener:latest
```

### 3. Use Multi-Stage Builds

The Dockerfile uses Alpine Linux for smaller image size. Production image is around 200MB.

### 4. Network Security

```bash
# Create custom network
docker network create url-shortener-net

# Run with custom network
docker run -d \
  --name url-shortener \
  --network url-shortener-net \
  -p 5000:5000 \
  --env-file .env \
  url-shortener:latest
```

### 5. Backup MongoDB Data

```bash
# Backup volume
docker run --rm \
  -v url-shortener_mongo-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/mongo-backup.tar.gz /data

# Restore volume
docker run --rm \
  -v url-shortener_mongo-data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/mongo-backup.tar.gz -C /
```

## Monitoring

### Container Stats

```bash
# Real-time stats
docker stats url-shortener

# One-time stats
docker stats --no-stream url-shortener
```

### Health Endpoint

Access the health check endpoint:
```bash
curl http://localhost:5000/
```

## Updating the Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build

# Or with docker run
docker stop url-shortener
docker rm url-shortener
docker build -t url-shortener:latest .
docker run -d --name url-shortener -p 5000:5000 --env-file .env url-shortener:latest
```

## Cleanup

```bash
# Stop all containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all images
docker rmi $(docker images -q)

# Remove all volumes
docker volume prune

# Complete cleanup
docker system prune -a --volumes
```

## Support

For issues and questions:
- Check container logs: `docker logs url-shortener`
- Verify environment variables
- Ensure MongoDB is accessible
- Check network connectivity
- Review Docker daemon logs

---

**Happy Deploying! 🚀**
