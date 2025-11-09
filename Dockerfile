# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy backend source code
COPY backend/ ./

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]