FROM node:18

WORKDIR /app

COPY package*.json ./

# INSTALL Dependency
RUN npm install

# copy the rest of application code
COPY . .

# run the build 
RUN npm run build

# expose the port
EXPOSE 8080

# invoke the process. 
CMD ["node", "./dist/src/index.js"]

