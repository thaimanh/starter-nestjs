# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project (excluding files in .dockerignore)
COPY . .

# Expose the application port
EXPOSE 3000

# Start the NestJS app
CMD ["npm", "run", "start:dev"]
