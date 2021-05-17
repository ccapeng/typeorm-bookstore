FROM node:alpine

WORKDIR '/app'

COPY package*.json ./
RUN npm install --silent
RUN npm run build
COPY . .

EXPOSE 8001

# CMD ["node", "index.js"]
# CMD ["npm", "run", "start"]
CMD ["node", "-r", "./tspaths", "./build/src/index.js"]