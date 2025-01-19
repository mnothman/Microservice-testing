# Use the official Node.js 18 image
FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the source code
COPY . .

# Expose the container port
EXPOSE 3000

# Run the "start" script
CMD ["npm", "start"]
