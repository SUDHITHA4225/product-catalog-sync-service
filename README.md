# Product Catalog Sync Service (Kafka + PostgreSQL)

A robust and scalable backend service that synchronizes product catalog data across internal systems using an event-driven architecture with Apache Kafka. The service consumes product creation and update events, persists them reliably in PostgreSQL using idempotent processing, and exposes RESTful APIs for querying synchronized product data.

---

## Architecture Overview

This project is designed using event-driven microservice architecture principles:

* Apache Kafka is used for asynchronous event ingestion.
* PostgreSQL provides durable and consistent data storage.
* A Dead Letter Queue (DLQ) handles invalid or unprocessable events.
* Docker Compose orchestrates all dependent services.
* REST APIs enable querying of synchronized product data.

### System Components

* Zookeeper – Kafka coordination
* Kafka – Message broker
* Product Catalog Sync Service (Node.js + Express) – Kafka consumer and API layer
* PostgreSQL – Persistent database
* DLQ Topic – Error isolation mechanism

---

## Features

* Kafka consumer for product creation and update events
* Idempotent event processing to avoid duplicate updates
* PostgreSQL persistence with optimistic versioning
* Dead Letter Queue for robust error handling
* REST APIs with pagination and filtering
* Health check endpoint for service monitoring
* Input validation for API requests
* Dockerized setup for easy deployment
* Unit and integration test coverage

---

## Project Structure

```
product-catalog-sync-service/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── kafka/
│   ├── middlewares/
│   └── config/
├── db/
│   └── init.sql
├── tests/
│   ├── unit/
│   └── integration/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## Running the Application

### Prerequisites

* Docker
* Docker Compose

### Start All Services

```bash
docker-compose up --build
```

This command starts:

* Zookeeper
* Kafka
* PostgreSQL
* Product Catalog Sync Service

---

## Kafka Topics

| Topic Name         | Description                          |
| ------------------ | ------------------------------------ |
| product-events     | Product creation and update events   |
| product-events-dlq | Dead Letter Queue for invalid events |

### Sample Valid Event

```json
{
  "id": "p2",
  "name": "MacBook",
  "description": "Apple laptop",
  "price": 1500
}
```

### Sample Invalid Event

```json
{
  "name": "Broken",
  "price": "abc"
}
```

Invalid events are redirected to the DLQ topic.

---

## REST API Endpoints

### Health Check

```
GET /health
```

Response:

```
 OK
```

---

### Get Products (Paginated and Filterable)

```
GET /products?page=1&limit=10&name=Mac
```

Response:

```json
{
  "currentPage": 1,
  "limit": 10,
  "totalItems": 1,
  "totalPages": 1,
  "data": [
    {
      "id": "p1",
      "name": "Seed Product",
      "description": "Initial product",
      "price": "99.99",
      "version": 1,
      "updated_at": "2026-02-17T16:44:05.614Z"
    }
  ]
}
```

---

### Get Product by ID

```
GET /products/{id}
```

Successful response:

```json
{
  "id": "p2",
  "name": "MacBook",
  "description": "Apple laptop",
  "price": "1500.00",
  "version": 2,
  "updated_at": "2026-02-17T16:01:38.774Z"
}
```

If the product does not exist:

```json
{
  "message": "Product not found"
}
```

---

## Error Handling and Dead Letter Queue

* Invalid Kafka messages are not retried endlessly.
* Messages that fail validation or processing are sent to `product-events-dlq`.
* This ensures system stability and fault tolerance.

---

## Idempotency and Concurrency Handling

* Duplicate Kafka messages for the same product ID do not result in inconsistent database state.
* Updates are applied safely using versioning.
* The latest valid state of each product is always preserved.

---

## Testing

### Unit Tests

* Product event validation
* Business logic and data transformation

### Integration Tests

* REST API validation
* Database interaction
* Kafka consumer behavior

Run tests using:

```bash
npm test
```

---

## Logging

The application logs:

* Kafka message consumption
* Successful and failed processing events
* Errors and DLQ redirection
* REST API request handling

These logs aid in debugging and monitoring.

---

### conclusion:
This project implements a reliable event-driven product catalog synchronization service using Apache Kafka and PostgreSQL, ensuring data consistency through idempotent processing and robust error handling. It demonstrates practical application of distributed systems concepts, including fault tolerance, scalability, and containerized deployment.


