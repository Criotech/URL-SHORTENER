FROM node:16.16.0

# Create application working directory
WORKDIR /usr/src/app

# Install app depenedencies
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install typescript --location=global
RUN npm install

COPY . .

RUN tsc 

EXPOSE 3200

CMD ["npm", "run", "start"]