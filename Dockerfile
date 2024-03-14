# Define the base image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the entire application code
COPY . .

# Define the volume
VOLUME /app-resources

# Expose port 3000
EXPOSE 3000

# Set the default command to run the application
CMD [ "npm", "start" ]