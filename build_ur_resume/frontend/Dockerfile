# frontend/Dockerfile (dev)
FROM node:24-bullseye-slim

WORKDIR /app

COPY package*.json ./

# Install all deps (including devDependencies) so Vite + plugins are present
RUN npm ci

COPY . .

EXPOSE 5173
ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "run", "dev", "--", "--host"]