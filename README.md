# JSON Save Backend API

A simple Node.js backend API that saves JSON data to MongoDB.

## Features

- Single API endpoint to save any JSON data
- MongoDB integration with Mongoose
- CORS enabled for cross-origin requests
- Input validation
- Error handling
- Health check endpoint

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone or download this project
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```bash
   cp env.example .env
   ```

4. Update the `.env` file with your MongoDB connection string:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/json-data-db
   ```

## Running the Server

### Development mode (with auto-restart):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will start on port 3000 (or the port specified in your .env file).

## API Endpoints

### POST /api/save

Saves whatever JSON data comes from frontend to MongoDB in the "datasave" model.

**Request Body:**

```json
{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "preferences": {
    "theme": "dark",
    "notifications": true
  },
  "hobbies": ["reading", "coding", "gaming"],
  "any": "json structure",
  "you": "want to send",
  "nested": {
    "objects": "are supported"
  },
  "arrays": [1, 2, 3, "strings too"]
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "Data saved successfully",
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "timestamp": "2023-09-06T10:30:00.000Z",
    "createdAt": "2023-09-06T10:30:00.000Z"
  }
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "message": "Request body cannot be empty"
}
```

### GET /api/health

Health check endpoint.

**Response:**

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2023-09-06T10:30:00.000Z"
}
```

### GET /

API information endpoint.

**Response:**

```json
{
  "message": "JSON Save Backend API",
  "endpoints": {
    "POST /api/save": "Save JSON data to MongoDB",
    "GET /api/health": "Health check"
  }
}
```

## Usage Examples

### Using curl:

```bash
curl -X POST http://localhost:3000/api/save \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "preferences": {
      "theme": "dark",
      "notifications": true
    },
    "hobbies": ["reading", "coding", "gaming"]
  }'
```

### Using JavaScript (fetch):

```javascript
const response = await fetch("http://localhost:3000/api/save", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user: {
      name: "John Doe",
      age: 30,
    },
    metadata: {
      source: "web-app",
      timestamp: new Date().toISOString(),
    },
    // Send any JSON data from frontend
    formData: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    },
  }),
});

const result = await response.json();
console.log(result);
```

### Using Python (requests):

```python
import requests
import json

data = {
    "temperature": 25.5,
    "humidity": 60,
    "location": "New York",
    "sensor_id": "temp_001",
    "timestamp": "2023-09-06T10:30:00.000Z"
}

response = requests.post(
    'http://localhost:3000/api/save',
    headers={'Content-Type': 'application/json'},
    data=json.dumps(data)
)

print(response.json())
```

## MongoDB Schema

The data is stored in a collection called `datasaves` with the following schema:

```javascript
{
  data: Mixed,        // Whatever JSON data comes from frontend
  timestamp: Date,    // When the data was saved
  createdAt: Date,    // Document creation time
  updatedAt: Date     // Document last update time
}
```

## Error Handling

The API includes comprehensive error handling for:

- Empty request body
- Invalid JSON format
- MongoDB connection issues
- Server errors

## Configuration

You can configure the following environment variables:

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string (default: mongodb://localhost:27017/json-data-db)

## License

MIT
