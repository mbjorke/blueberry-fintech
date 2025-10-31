# Build stage
FROM node:20-alpine AS build
WORKDIR /app
ARG CACHEBUST=1
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
# Force rebuild of the app layer when CACHEBUST changes
RUN echo "Cache bust: $CACHEBUST" >/dev/null
# Build the dashboard app (not storybook)
RUN npm run build
# Verify we built the dashboard and not storybook
RUN test -f dist/index.html && echo "Dashboard build successful" || (echo "ERROR: Dashboard build failed!" && exit 1)
RUN test ! -f dist/iframe.html && echo "Verified: No storybook iframe.html" || echo "WARNING: Storybook files detected"
RUN ls -la dist/ | head -10

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
