# 🚀 Deployment Guide

This guide covers deploying the Renter application to various platforms with production-ready configurations.

## 📋 Prerequisites

- Node.js 18+ installed
- Database (PostgreSQL recommended for production)
- Domain name (optional but recommended)
- SSL certificate (for HTTPS)

## 🐳 Docker Deployment

### Local Development with Docker

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - App: http://localhost:3000
   - Database: localhost:5432
   - Redis: localhost:6379

### Production Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t renter-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
     -e NEXTAUTH_SECRET="your-secret" \
     renter-app
   ```

## ☁️ Vercel Deployment (Recommended)

### Automatic Deployment

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect Next.js

2. **Configure Environment Variables**
   ```env
   DATABASE_URL=postgresql://user:pass@host:5432/db
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-super-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be available at `https://your-app.vercel.app`

### Manual Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

## 🐘 Railway Deployment

1. **Connect to Railway**
   - Sign up at railway.app
   - Connect your GitHub repository

2. **Configure Environment Variables**
   - Add all required environment variables in Railway dashboard
   - Railway will automatically provide a PostgreSQL database

3. **Deploy**
   - Railway will automatically build and deploy your application

## 🐳 DigitalOcean App Platform

1. **Create App Spec**
   ```yaml
   name: renter-app
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/renter
       branch: main
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: NODE_ENV
       value: production
     - key: DATABASE_URL
       value: ${db.DATABASE_URL}
   databases:
   - name: db
     engine: PG
     version: "13"
   ```

2. **Deploy**
   - Upload the app spec to DigitalOcean
   - DigitalOcean will provision infrastructure and deploy

## 🐘 AWS Deployment

### Using AWS App Runner

1. **Create App Runner Service**
   - Connect to your GitHub repository
   - Configure build and run commands
   - Set environment variables

2. **Configure RDS Database**
   - Create PostgreSQL RDS instance
   - Configure security groups
   - Update DATABASE_URL

### Using AWS ECS

1. **Build and push Docker image**
   ```bash
   aws ecr create-repository --repository-name renter-app
   docker tag renter-app:latest your-account.dkr.ecr.region.amazonaws.com/renter-app:latest
   docker push your-account.dkr.ecr.region.amazonaws.com/renter-app:latest
   ```

2. **Create ECS Task Definition**
   - Use the pushed Docker image
   - Configure environment variables
   - Set up logging

3. **Create ECS Service**
   - Configure load balancer
   - Set up auto-scaling
   - Configure health checks

## 🐘 Google Cloud Platform

### Using Cloud Run

1. **Build and deploy**
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT-ID/renter-app
   gcloud run deploy --image gcr.io/PROJECT-ID/renter-app --platform managed
   ```

2. **Configure Cloud SQL**
   - Create PostgreSQL instance
   - Configure connection
   - Update DATABASE_URL

## 🐘 Azure Deployment

### Using Azure Container Instances

1. **Build and push to Azure Container Registry**
   ```bash
   az acr build --registry myregistry --image renter-app .
   ```

2. **Deploy to Container Instances**
   ```bash
   az container create --resource-group myResourceGroup --name renter-app --image myregistry.azurecr.io/renter-app:latest
   ```

## 🔧 Production Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secret-key-32-chars-minimum

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security
JWT_SECRET=your-jwt-secret-key

# CDN (Optional)
CDN_URL=https://your-cdn-domain.com
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=your-bucket-name

# Monitoring (Optional)
SENTRY_DSN=your-sentry-dsn
GOOGLE_ANALYTICS_ID=your-ga-id
```

### Database Setup

1. **PostgreSQL Configuration**
   ```sql
   -- Create database
   CREATE DATABASE renter_db;
   
   -- Create user
   CREATE USER renter_user WITH PASSWORD 'secure_password';
   
   -- Grant permissions
   GRANT ALL PRIVILEGES ON DATABASE renter_db TO renter_user;
   ```

2. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### SSL Configuration

1. **Let's Encrypt (Recommended)**
   ```bash
   certbot --nginx -d your-domain.com
   ```

2. **Manual SSL**
   - Upload SSL certificates
   - Configure web server (Nginx/Apache)
   - Redirect HTTP to HTTPS

### Performance Optimization

1. **Enable Compression**
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

2. **Configure Caching**
   ```nginx
   location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
     expires 1y;
     add_header Cache-Control "public, immutable";
   }
   ```

3. **Database Optimization**
   - Enable connection pooling
   - Configure query optimization
   - Set up monitoring

## 📊 Monitoring & Logging

### Application Monitoring

1. **Sentry Integration**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Health Checks**
   - Configure health check endpoints
   - Set up uptime monitoring
   - Configure alerting

### Database Monitoring

1. **Query Performance**
   - Enable slow query logging
   - Monitor connection usage
   - Set up alerts for high CPU/memory

2. **Backup Strategy**
   - Automated daily backups
   - Point-in-time recovery
   - Cross-region replication

## 🔒 Security Checklist

- [ ] HTTPS enabled with valid SSL certificate
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] OAuth credentials configured
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Input validation enabled
- [ ] File upload restrictions
- [ ] CORS properly configured
- [ ] Error handling without information leakage

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check DATABASE_URL format
   - Verify network connectivity
   - Check firewall rules

2. **Authentication Issues**
   - Verify NEXTAUTH_SECRET
   - Check OAuth credentials
   - Validate callback URLs

3. **File Upload Issues**
   - Check file size limits
   - Verify upload directory permissions
   - Check disk space

4. **Performance Issues**
   - Monitor database queries
   - Check memory usage
   - Optimize images
   - Enable caching

### Debug Commands

```bash
# Check application logs
docker logs container-name

# Check database connectivity
npx prisma db pull

# Test API endpoints
curl -X GET https://your-domain.com/api/health

# Check environment variables
printenv | grep -E "(DATABASE|NEXTAUTH|GOOGLE)"
```

## 📈 Scaling Considerations

### Horizontal Scaling

1. **Load Balancer Configuration**
   - Multiple app instances
   - Session affinity (if using server-side sessions)
   - Health checks

2. **Database Scaling**
   - Read replicas
   - Connection pooling
   - Query optimization

### Vertical Scaling

1. **Resource Monitoring**
   - CPU usage
   - Memory consumption
   - Disk I/O

2. **Auto-scaling**
   - Configure based on metrics
   - Set up alerts
   - Test scaling behavior

---

For additional support, refer to the main README.md or create an issue in the repository.
