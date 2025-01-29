# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Generate Prisma client
RUN npm run prisma:generate

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"] 