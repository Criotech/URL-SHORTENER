# pull official base image
FROM node:16.16.0

# set working directory
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . .

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install serve --location=global

# Uses port which is used by the actual application
EXPOSE 3000

# Run application
#CMD [ "npm", "start" ]
CMD serve -s build