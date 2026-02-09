# -----------------------------
# Base Stage
# -----------------------------

# Use official lightweight Node.js 20 image based on Alpine Linux
# Alpine is small → smaller Docker image size
FROM node:20-alpine AS base

# Set working directory inside container to /app
# All future commands run from this directory
WORKDIR src/app

# Set environment variable inside container
# Tells Node and Next.js we are in production mode
ENV NODE_ENV=production


# -----------------------------
# Dependencies Stage
# -----------------------------

# Create a new stage based on the "base" image
# This stage is only for installing dependencies
FROM base AS deps

# Copy only package.json and package-lock.json
# We copy only these first to leverage Docker layer caching
COPY package.json package-lock.json* ./

# Install exact dependencies from package-lock.json
# npm ci is faster and more reliable for production builds
RUN npm ci


# -----------------------------
# Build Stage
# -----------------------------

# Create another stage based on base
# This stage builds the Next.js app
FROM base AS builder

# Copy installed node_modules from deps stage
# This avoids reinstalling dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy entire project source code into container
COPY . .

# Build Next.js app
# This generates the .next folder
RUN npm run build


# -----------------------------
# Production Runner Stage
# -----------------------------

# Start fresh again from small Node image
# This keeps final image small (no dev dependencies)
FROM node:20-alpine AS runner

# Set working directory again
WORKDIR src/app

# Production environment
ENV NODE_ENV=production

# Copy public folder (static assets like images)
COPY --from=builder /app/public ./public

# Copy standalone server build output
# This contains server.js + minimal node_modules
COPY --from=builder /app/.next/standalone ./

# Copy static files generated during build
COPY --from=builder /app/.next/static ./.next/static

# Tell Docker the container listens on port 3000
# (This does NOT publish the port, just documentation)
EXPOSE 3000

# Command that runs when container starts
# Runs the generated Next.js standalone server
CMD ["node", "server.js"]
