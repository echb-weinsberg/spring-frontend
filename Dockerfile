# Stage 1: Build the Vite project
FROM node:18 as build

ARG VITE_APP_CMS_URL

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite project
RUN npm run build

# Stage 2: Serve the built files with Nginx
FROM nginx:alpine

# Copy built static files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for the server
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration if necessary
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 1236
EXPOSE 1236

# Update Nginx configuration to listen on port 1236
RUN sed -i 's/listen\s*80;/listen 1236;/' /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
