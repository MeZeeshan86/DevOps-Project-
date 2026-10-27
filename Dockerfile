# Multi-stage production build for Student Attendance Management System
FROM node:20-alpine AS build

# Set working directory inside container
WORKDIR /usr/src/app

# Copy dependency manifests
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose web application port
EXPOSE 3000

# Health check to ensure service vitality
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

# Define runtime user for security hardening
USER node

# Start Node.js application
CMD ["node", "server.js"]
