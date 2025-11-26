FROM node:16

WORKDIR /usr/src/app

COPY server.js ./

# Install Node dependencies inside Docker
RUN npm init -y && npm install express body-parser sqlite3

# Copy data folder to persist DB file
COPY data ./data

EXPOSE 8080

CMD ["node", "server.js"]