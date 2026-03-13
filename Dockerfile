FROM node:20-slim

WORKDIR /app

# Install dependencies for both root and client
COPY package*.json ./
COPY client/package*.json ./client/
RUN npm install
RUN cd client && npm install

# Copy source code
COPY . .

# Build the client
RUN npm run build

# Expose the port
EXPOSE 5001

# Start the application
CMD ["npm", "start"]
