FROM --platform=amd64 node:18-alpine

WORKDIR /app

COPY package*.json ./

# INSTALL Dependency
RUN npm ci

# copy the rest of application code
COPY . .

# run the build 
RUN npm run build

# expose the port
EXPOSE 8080

# invoke the process. 
CMD ["node", "./dist/src/startup/createServer.js"]

