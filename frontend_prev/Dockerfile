FROM bitnami/nginx:latest

# Copy your static frontend
COPY . /app

# Use Bitnami’s env variable to change the web root
ENV NGINX_HTML_DIR=/app

EXPOSE 8080
