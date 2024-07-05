# Base
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Development
FROM base AS development
ENV NODE_ENV=development
CMD ["npm", "run", "start:live"]

# Production
FROM base AS production
ENV NODE_ENV=production
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]