FROM node:18-alpine

# set /app as working directory
WORKDIR /app

# copy only package files & install dependencies
COPY package*.json ./
RUN npm ci --only=production

# copy source  code
COPY . .

# tells Docker this container listens on port 4000
EXPOSE 4000

# default command to run my server
CMD ["node", "server.js"]
