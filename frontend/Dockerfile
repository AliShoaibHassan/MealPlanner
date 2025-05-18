# frontend/Dockerfile
FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3100

CMD ["npm", "run", "dev", "--", "--host", "--port=3100"]

