# Build stage
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# In a real environment, you'd set VITE_API_BASE at build time here
# For the hackathon, we'll allow it to be configured via scripts
RUN npm run build

# Production stage
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Default nginx config is usually fine for a simple React app
# But for Cloud Run, we must listen on the $PORT env var
# We'll use a simple shell script to replace the port in the config
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

EXPOSE 8080

CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
