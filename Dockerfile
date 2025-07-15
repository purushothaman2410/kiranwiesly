# --- Stage 1: Build the Vite app ---

FROM node:18-slim AS builder
 
# Install required build tools for native deps

RUN apt-get update && apt-get install -y python3 g++ make
 
# Set working directory

WORKDIR /app
 
# Copy package files first (for better Docker caching)

COPY package*.json ./
 
# Install dependencies with legacy peer deps to avoid conflict

RUN npm install --legacy-peer-deps
 
# Copy rest of the project files

COPY . .
 
# Build the Vite app

RUN npm run build
 
# --- Stage 2: Serve the built app with `serve` ---

FROM node:18-slim
 
# Install `serve` globally

RUN npm install -g serve
 
# Working directory for runtime

WORKDIR /app
 
# Copy built files from builder

COPY --from=builder /app/dist ./dist
 
# Expose the port

EXPOSE 8080
 
# Serve the frontend

CMD ["serve", "-s", "dist", "-l", "8080"]
 
