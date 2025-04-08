FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
RUN npm run build
# Set the node environment to production
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

# Use the node user from the image
USER node

# Expose the application port
EXPOSE 7001

# Command to run the application
CMD ["node", "dist/main"]