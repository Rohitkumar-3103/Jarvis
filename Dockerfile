# Use official lightweight Python image
FROM python:3.12-slim

# Set working directory inside container
WORKDIR /app

# Copy requirement files first to leverage Docker cache
COPY requirements-docker.txt .

# Install cross-platform dependencies
RUN pip install --no-cache-dir -r requirements-docker.txt

# Copy source files needed for the backend service
COPY backend/ ./backend/
COPY actions/ ./actions/
COPY memory/ ./memory/
COPY core/ ./core/
COPY config/ ./config/

# Set environment variables for network binding
ENV FLASK_HOST=0.0.0.0
ENV FLASK_PORT=5000

# Expose backend port
EXPOSE 5000

# Start Flask backend server
CMD ["python", "backend/server.py"]
