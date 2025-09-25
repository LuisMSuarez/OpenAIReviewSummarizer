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

# Generate Prisma client in server package
WORKDIR /app/packages/server
RUN bunx prisma generate

# Return to root and build both packages
WORKDIR /app
RUN bun run build

# Expose ports (adjust as needed)
EXPOSE 3000

# Start both client and server
CMD ["bun", "start.ts"]