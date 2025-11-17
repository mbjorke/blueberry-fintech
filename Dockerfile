# Build stage
FROM node:20-alpine AS build
WORKDIR /app
ARG CACHEBUST=1
COPY package*.json ./
RUN npm install --legacy-peer-deps
# Install native binaries for Alpine Linux (musl)
RUN npm install --no-save @rollup/rollup-linux-x64-musl @swc/core-linux-x64-musl lightningcss-linux-x64-musl @tailwindcss/oxide-linux-x64-musl || true
COPY . .
# Force rebuild of the app layer when CACHEBUST changes
RUN echo "Cache bust: $CACHEBUST" >/dev/null
# Build the dashboard app (not storybook)
RUN npm run build
# Verify we built the dashboard and not storybook
RUN test -f dist/index.html || (echo "ERROR: Dashboard build failed - no index.html!" && exit 1)
RUN test ! -f dist/iframe.html || (echo "ERROR: Storybook detected in dist! Build is wrong!" && exit 1)
RUN test ! -d dist/iframe.html || (echo "ERROR: Storybook iframe.html found!" && exit 1)
RUN grep -q "Fintech Dashboard" dist/index.html || (echo "ERROR: Dashboard index.html doesn't contain expected title!" && exit 1)
RUN echo "✓ Dashboard build verified successfully"
RUN ls -la dist/ | head -10

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
