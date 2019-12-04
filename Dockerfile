FROM mhart/alpine-node:11
WORKDIR /app
COPY package*.json ./
COPY node_modules/ ./
COPY build/ /app/build
EXPOSE 3000
CMD ["node", "server.js"]
