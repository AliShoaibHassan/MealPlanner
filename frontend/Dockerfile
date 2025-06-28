# frontend/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Create a simple express server for handling client-side routing
RUN npm install express connect-history-api-fallback --save-dev

# Create a server.js file for proper routing
RUN echo 'const express = require("express"); \
const history = require("connect-history-api-fallback"); \
const app = express(); \
app.use(history()); \
app.use(express.static("dist")); \
const PORT = process.env.PORT || 3100; \
app.listen(PORT, "0.0.0.0", () => { \
  console.log(`Server running on port ${PORT}`); \
});' > server.js

EXPOSE 3100

# Development mode
CMD ["npm", "run", "dev", "--", "--host", "--port=3100"]

