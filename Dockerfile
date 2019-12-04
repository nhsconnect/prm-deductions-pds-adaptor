FROM node:11.15.0-alpine
WORKDIR /app
COPY package*.json ./
COPY node_modules/ ./node_modules
COPY build/ /app/

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
COPY ./certs/deductions.crt /usr/local/share/ca-certificates/deductions.crt
RUN update-ca-certificates

EXPOSE 3000
CMD ["node", "server.js"]
