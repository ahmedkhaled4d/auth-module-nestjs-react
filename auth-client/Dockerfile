# Use an official Node runtime as a base image
FROM node:18 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the local code into the container
COPY . .

# Build the React app for production
RUN npm run build

# Use a smaller, optimized image for serving the app
FROM nginx:alpine

# Copy the built app from the build stage to the nginx public directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the port that the nginx server will run on
EXPOSE 80

# Default command to start nginx
CMD ["nginx", "-g", "daemon off;"]