FROM node:alpine

WORKDIR '/app'

# COPY package*.json ./
COPY . .
RUN npm install --silent
RUN npm run prebuild
RUN npm run build

EXPOSE 8001

# CMD ["node", "index.js"]
# CMD ["npm", "run", "start"]
CMD ["node", "-r", "./tspaths", "./build/src/index.js"]