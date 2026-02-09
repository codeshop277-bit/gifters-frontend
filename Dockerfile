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


# 2️⃣ Build Image Locally
# docker build -t my-next-app .
# Test it:
# docker run -p 3000:3000 my-next-app
# Open:
# http://localhost:3000
# 3️⃣ Launch EC2 Instance
# Go to:
# 👉 Amazon Web Services
# Choose:
# Ubuntu 22.04
# t2.micro (free tier)
# Allow ports:
# 22 (SSH)
# 80 (HTTP)
# 3000 (temporary testing)
# 4️⃣ SSH Into EC2
# ssh -i your-key.pem ubuntu@your-ec2-public-ip
# 5️⃣ Install Docker on EC2
# sudo apt update
# sudo apt install docker.io -y
# sudo systemctl start docker
# sudo systemctl enable docker
# sudo usermod -aG docker ubuntu
# 6️⃣ Get Your Image to EC2
# Option A (Beginner Friendly) — Build directly on EC2
# Upload your project:
# scp -i your-key.pem -r ./my-next-app ubuntu@EC2_IP:/home/ubuntu
# Then inside EC2:
# cd my-next-app
# docker build -t my-next-app .
# 7️⃣ Run Container on EC2
# docker run -d -p 3000:3000 --name next-app my-next-app
# Now open:
# http://your-ec2-public-ip:3000
# You should see your app 🔥