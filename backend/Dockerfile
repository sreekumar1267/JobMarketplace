# Use Node.js base image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including TypeScript globally
RUN npm install -g typescript && npm install

# Copy the remaining files
COPY . .

COPY ./prisma prisma
RUN npx prisma generate
RUN npx prisma migrate dev --name init

# Build the TypeScript code
RUN tsc

# Expose application port
EXPOSE 3001

# Command to run the application
CMD ["node", "dist/index.js"]
