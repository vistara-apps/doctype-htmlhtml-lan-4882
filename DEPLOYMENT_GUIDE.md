# Deployment Guide
## EduConnect Sales Dashboard

**Project ID**: fad7faaf-6416-4139-819a-cdb3db8ff8de  
**Version**: 1.0  
**Last Updated**: September 2025

---

## 1. Overview

This guide provides comprehensive instructions for deploying the EduConnect Sales Dashboard to various environments including development, staging, and production.

### 1.1 Deployment Options
- **Vercel** (Recommended) - Serverless deployment with automatic CI/CD
- **Docker** - Containerized deployment for any cloud provider
- **Static Hosting** - Traditional static file hosting (Netlify, AWS S3, etc.)
- **Self-hosted** - Custom server deployment

---

## 2. Prerequisites

### 2.1 System Requirements
- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **Git**: Latest version
- **Docker**: 20.10+ (for containerized deployment)

### 2.2 Environment Setup
```bash
# Verify Node.js version
node --version  # Should be 18+

# Verify npm version
npm --version   # Should be 8+

# Clone the repository
git clone https://github.com/vistara-apps/doctype-htmlhtml-lan-4882.git
cd doctype-htmlhtml-lan-4882
```

---

## 3. Vercel Deployment (Recommended)

### 3.1 Automatic Deployment
The repository is pre-configured for automatic Vercel deployment via GitHub Actions.

#### Setup Steps
1. **Fork or clone the repository**
2. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the Vite configuration

3. **Configure Environment Variables** (if needed):
   ```env
   VITE_APP_TITLE=EduConnect Sales Dashboard
   VITE_API_BASE_URL=https://api.educonnect.com
   VITE_ENVIRONMENT=production
   ```

4. **Deploy**:
   - Push to `main` branch triggers automatic deployment
   - Pull requests create preview deployments

### 3.2 Manual Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Deploy preview
vercel
```

### 3.3 Vercel Configuration
**File**: `vercel.json` (optional)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "functions": {},
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## 4. Docker Deployment

### 4.1 Using Pre-built Docker Image
```bash
# Build the Docker image
docker build -t educonnect-dashboard .

# Run the container
docker run -p 3000:3000 educonnect-dashboard

# Access the application
open http://localhost:3000
```

### 4.2 Docker Compose
**File**: `docker-compose.yml`
```yaml
version: '3.8'

services:
  dashboard:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - dashboard
    restart: unless-stopped
```

### 4.3 Multi-stage Docker Build
The included `Dockerfile` uses multi-stage builds for optimization:

```dockerfile
# Stage 1: Build
FROM node:22-alpine AS builder
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN npm install --prefer-offline --no-audit
COPY . .
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Stage 2: Production
FROM node:22-alpine AS production
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

---

## 5. AWS Deployment

### 5.1 AWS S3 + CloudFront
```bash
# Build the application
npm run build

# Install AWS CLI
pip install awscli

# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://educonnect-dashboard-prod

# Upload files
aws s3 sync dist/ s3://educonnect-dashboard-prod --delete

# Create CloudFront distribution (via AWS Console or CLI)
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

### 5.2 CloudFront Configuration
**File**: `cloudfront-config.json`
```json
{
  "CallerReference": "educonnect-dashboard-2025",
  "Comment": "EduConnect Sales Dashboard",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-educonnect-dashboard-prod",
        "DomainName": "educonnect-dashboard-prod.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-educonnect-dashboard-prod",
    "ViewerProtocolPolicy": "redirect-to-https",
    "Compress": true,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    }
  },
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200"
      }
    ]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
```

### 5.3 AWS ECS Deployment
**File**: `ecs-task-definition.json`
```json
{
  "family": "educonnect-dashboard",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "dashboard",
      "image": "your-account.dkr.ecr.region.amazonaws.com/educonnect-dashboard:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/educonnect-dashboard",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

---

## 6. Google Cloud Platform (GCP)

### 6.1 Google Cloud Storage + CDN
```bash
# Build the application
npm run build

# Install Google Cloud SDK
curl https://sdk.cloud.google.com | bash

# Authenticate
gcloud auth login

# Create bucket
gsutil mb gs://educonnect-dashboard-prod

# Upload files
gsutil -m rsync -r -d dist/ gs://educonnect-dashboard-prod

# Make bucket public
gsutil iam ch allUsers:objectViewer gs://educonnect-dashboard-prod

# Enable CDN
gcloud compute backend-buckets create educonnect-dashboard-backend \
  --gcs-bucket-name=educonnect-dashboard-prod
```

### 6.2 Google Cloud Run
```bash
# Build and push Docker image
gcloud builds submit --tag gcr.io/PROJECT-ID/educonnect-dashboard

# Deploy to Cloud Run
gcloud run deploy educonnect-dashboard \
  --image gcr.io/PROJECT-ID/educonnect-dashboard \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000
```

---

## 7. Azure Deployment

### 7.1 Azure Static Web Apps
```bash
# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login
az login

# Create resource group
az group create --name educonnect-rg --location eastus

# Create static web app
az staticwebapp create \
  --name educonnect-dashboard \
  --resource-group educonnect-rg \
  --source https://github.com/vistara-apps/doctype-htmlhtml-lan-4882 \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "dist"
```

### 7.2 Azure Container Instances
```bash
# Create container instance
az container create \
  --resource-group educonnect-rg \
  --name educonnect-dashboard \
  --image your-registry/educonnect-dashboard:latest \
  --dns-name-label educonnect-dashboard \
  --ports 3000
```

---

## 8. Environment Configuration

### 8.1 Environment Variables
Create environment-specific `.env` files:

**Development** (`.env.development`)
```env
VITE_APP_TITLE=EduConnect Sales Dashboard (Dev)
VITE_API_BASE_URL=http://localhost:3001/api
VITE_ENVIRONMENT=development
VITE_DEBUG=true
```

**Staging** (`.env.staging`)
```env
VITE_APP_TITLE=EduConnect Sales Dashboard (Staging)
VITE_API_BASE_URL=https://api-staging.educonnect.com/api
VITE_ENVIRONMENT=staging
VITE_DEBUG=false
```

**Production** (`.env.production`)
```env
VITE_APP_TITLE=EduConnect Sales Dashboard
VITE_API_BASE_URL=https://api.educonnect.com/api
VITE_ENVIRONMENT=production
VITE_DEBUG=false
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### 8.2 Build Scripts
Update `package.json` for environment-specific builds:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "preview": "vite preview"
  }
}
```

---

## 9. CI/CD Pipeline

### 9.1 GitHub Actions Workflow
**File**: `.github/workflows/deploy.yml`
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '22'
        cache: 'npm'
    - run: npm ci
    - run: npm run test
    - run: npm run build

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '22'
        cache: 'npm'
    - run: npm ci
    - run: npm run build:staging
    - uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '22'
        cache: 'npm'
    - run: npm ci
    - run: npm run build:production
    - uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-args: '--prod'
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### 9.2 GitLab CI/CD
**File**: `.gitlab-ci.yml`
```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "22"

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run test
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

deploy-staging:
  stage: deploy
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build:staging
    - # Deploy to staging environment
  only:
    - merge_requests

deploy-production:
  stage: deploy
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build:production
    - # Deploy to production environment
  only:
    - main
```

---

## 10. SSL/TLS Configuration

### 10.1 Let's Encrypt with Nginx
```nginx
server {
    listen 80;
    server_name dashboard.educonnect.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name dashboard.educonnect.com;

    ssl_certificate /etc/letsencrypt/live/dashboard.educonnect.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dashboard.educonnect.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 10.2 Automatic SSL Renewal
```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d dashboard.educonnect.com

# Test renewal
sudo certbot renew --dry-run

# Add to crontab for automatic renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

---

## 11. Monitoring & Health Checks

### 11.1 Health Check Endpoint
Create a simple health check:
```javascript
// public/health.json
{
  "status": "healthy",
  "timestamp": "2025-09-05T20:17:08Z",
  "version": "1.0.0"
}
```

### 11.2 Uptime Monitoring
```bash
# Using curl for basic monitoring
curl -f https://dashboard.educonnect.com/health.json || echo "Site is down"

# Using wget
wget --spider -q https://dashboard.educonnect.com || echo "Site is down"
```

### 11.3 Application Performance Monitoring
```javascript
// Add to index.html for real user monitoring
<script>
  // Performance monitoring
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart);
  });
</script>
```

---

## 12. Rollback Procedures

### 12.1 Vercel Rollback
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### 12.2 Docker Rollback
```bash
# Tag current version
docker tag educonnect-dashboard:latest educonnect-dashboard:backup

# Pull previous version
docker pull educonnect-dashboard:previous

# Stop current container
docker stop educonnect-dashboard

# Start previous version
docker run -d --name educonnect-dashboard -p 3000:3000 educonnect-dashboard:previous
```

### 12.3 Git-based Rollback
```bash
# Find the commit to rollback to
git log --oneline

# Create rollback commit
git revert [commit-hash]

# Push rollback
git push origin main
```

---

## 13. Performance Optimization

### 13.1 Build Optimization
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
          icons: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### 13.2 CDN Configuration
```javascript
// For static assets
const CDN_URL = 'https://cdn.educonnect.com'

// Update asset URLs in build
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? CDN_URL : '/'
})
```

---

## 14. Security Considerations

### 14.1 Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               font-src 'self' https://fonts.gstatic.com;">
```

### 14.2 Security Headers
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

---

## 15. Troubleshooting

### 15.1 Common Issues

#### Build Failures
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+
```

#### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### Port Conflicts
```bash
# Check what's using port 3000
lsof -i :3000

# Kill process using port
kill -9 $(lsof -t -i:3000)
```

### 15.2 Debugging Production Issues
```bash
# Check application logs
docker logs educonnect-dashboard

# Monitor resource usage
docker stats educonnect-dashboard

# Check network connectivity
curl -I https://dashboard.educonnect.com
```

---

## 16. Maintenance

### 16.1 Regular Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### 16.2 Backup Procedures
```bash
# Backup source code
git archive --format=tar.gz --output=backup-$(date +%Y%m%d).tar.gz HEAD

# Backup environment configuration
cp .env.production .env.production.backup.$(date +%Y%m%d)
```

---

**Document Version**: 1.0  
**Last Updated**: September 2025  
**Next Review**: October 2025
