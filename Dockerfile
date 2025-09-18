# Use Bun official image
FROM oven/bun:latest

WORKDIR /app

# Copy root files and install root dependencies
# Copy root and workspace manifests
COPY package.json bun.lock ./
COPY packages/server/package.json ./packages/server/
COPY packages/client/package.json ./packages/client/

# Install dependencies with full workspace context
RUN bun install

# Copy the rest of the monorepo
COPY . .

# Build both packages
RUN bun run build

# Expose ports (adjust as needed)
EXPOSE 3000

# Start both client and server
CMD ["bun", "start.ts"]