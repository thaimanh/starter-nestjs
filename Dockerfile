# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN yarn install
RUN yarn add cross-env

# Copy the entire project (excluding files in .dockerignore)
COPY . .

# Expose the application port
EXPOSE 3001

# Start the NestJS app
CMD ["yarn", "start:dev"]
