# Notification Service

## Features
- Email, SMS, In-App notifications
- MongoDB storage
- RabbitMQ-based message queue with retry support

## Setup
1. Run MongoDB and RabbitMQ via Docker:
```bash
docker-compose up -d
```
2. Install dependencies:
```bash
npm install
```
3. Run the app:
```bash
node app.js
```
4. Access RabbitMQ UI: http://localhost:15672

## API
- POST /api/notifications
- GET /api/users/:id/notifications