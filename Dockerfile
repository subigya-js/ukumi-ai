# Use Node.js 18 as the base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) from the web directory
COPY web/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the web directory
COPY web .

# Build the Next.js app
RUN npm run build

# Start a new stage for a smaller production image
FROM node:18-alpine AS production

WORKDIR /app

# Copy built assets from the base stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]