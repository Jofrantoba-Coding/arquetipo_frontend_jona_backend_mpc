# Base
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Watch
RUN adduser -D -u 1001 app
USER app
COPY --chown=app:app . .

# Development
FROM base AS development
ENV NODE_ENV=development
CMD ["npm", "run", "start:live"]

# Production
FROM base AS production
ENV NODE_ENV=production
RUN npm run build
EXPOSE 3005
CMD ["npm", "start"]