# Workout Logger API - Challenge

This is the complete backend for the Workout Logger technical assessment. It's built with Node.js, Express, and MongoDB, and is specifically designed to support an offline-first React Native client using Redux Offline.

## Features

-   **JWT Authentication**: Secure user registration and login.
-   **Full CRUD API**: Endpoints for managing workout sessions and templates.
-   **Static Data API**: Endpoints to fetch the exercise and category database.
-   **Advanced Sync Endpoint**: A single endpoint (`/api/sync`) to process a batch of offline changes.
-   **Conflict Resolution**: Implements a "Last Write Wins" (LWW) strategy using client-provided timestamps.
-   **Database Seeder**: A script to easily populate the database with sample exercises and categories.
-   **Scalable Architecture**: Clean and organized project structure.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [MongoDB](https://www.mongodb.com/) (either local or a free Atlas cluster)
-   `npm` or `yarn`

### Installation

1.  **Clone the repository** (or copy the files into a new project).

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root of the project and add the following, replacing the placeholders with your actual data:

    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    JWT_EXPIRES_IN=30d
    ```

### Running the Server

-   **Development Mode** (with hot-reloading via nodemon):
    ```bash
    npm run dev
    ```

-   **Production Mode**:
    ```bash
    npm start
    ```

The API will be running at `http://localhost:5000`.

### Seeding the Database

To populate the database with initial exercises and categories, run:

```bash
npm run seed
```

To delete all exercises and categories from the database:

```bash
npm run seed:destroy
```

## API Endpoints

**Base URL:** `/api`

### Authentication (`/auth`)

-   `POST /register` - Register a new user.
    -   Body: `{ "name", "email", "password" }`
-   `POST /login` - Log in a user and get a JWT.
    -   Body: `{ "email", "password" }`

### Exercises (`/exercises`)

-   `GET /` - Get all exercises. Supports query params `?search=...` and `?category=...`.
-   `GET /categories` - Get all exercise categories.

### Workouts (`/workouts`)

*All routes are protected and require a `Bearer <token>` in the `Authorization` header.*

-   `GET /all` - Fetches all of the user's data (sessions, templates). This is intended for the initial data hydration after a user logs in.

### Synchronization (`/sync`)

*This is the core endpoint for the offline-first functionality. It is protected.*

-   `POST /` - Processes a batch of offline changes. The client should send its entire queue of creates, updates, and deletes.

    **Request Body Structure:**

    The client should structure its offline queue into a `changes` object, grouped by model and operation type.

    ```json
    {
      "changes": {
        "workoutSessions": {
          "created": [
            {
              "clientId": "client-uuid-1",
              "startTime": "2023-10-27T10:00:00Z",
              "lastModifiedAt": "2023-10-27T11:00:00Z",
              "performedExercises": [...]
            }
          ],
          "updated": [
            {
              "clientId": "client-uuid-2",
              "notes": "Felt strong today.",
              "lastModifiedAt": "2023-10-27T12:00:00Z",
              "performedExercises": [...]
            }
          ],
          "deleted": ["client-uuid-3"]
        },
        "workoutTemplates": {
          "created": [],
          "updated": [],
          "deleted": []
        }
      }
    }
    ```

    **Key Fields for Sync:**
    -   `clientId`: A unique identifier (e.g., UUID) generated on the client. This is the primary key for an item before it's saved to the server.
    -   `lastModifiedAt`: A timestamp generated on the client whenever a record is created or updated. This is **essential** for conflict resolution.

    **Response Body Structure:**

    The server responds with the result of each operation and the latest state of the user's data.

    ```json
    {
        "syncResults": {
            "workoutSessions": {
                "created": [
                    { "clientId": "client-uuid-1", "status": "SUCCESS", "serverId": "653b..." }
                ],
                "updated": [
                    {
                      "clientId": "client-uuid-2",
                      "status": "CONFLICT",
                      "serverRecord": { ... a newer version of the record from the server ... }
                    }
                ],
                "deleted": [
                    { "clientId": "client-uuid-3", "status": "SUCCESS" }
                ]
            }
        },
        "latestData": {
            "sessions": [ ...all user sessions from DB... ],
            "templates": [ ...all user templates from DB... ]
        }
    }
    ```

    The client can use `syncResults` to clear its outbox and `latestData` to replace its entire local state, ensuring it is perfectly in sync with the server. A conflict status tells the client it needs to merge its local changes with the newer server version.

## Architecture Decisions

### Conflict Resolution

We use a **Last Write Wins (LWW)** strategy based on the `lastModifiedAt` timestamp.

-   When a client sends an `update` for a record, it includes its `lastModifiedAt` timestamp.
-   The server compares this timestamp with the `lastModifiedAt` of the record in the database.
-   If the client's timestamp is newer or equal, the update is accepted.
-   If the server's timestamp is newer, the update is rejected, and the server sends its version of the record back to the client. The client is then responsible for resolving this conflict (e.g., by merging data or asking the user).

This approach is simple, robust, and well-suited for mobile applications where network connectivity is intermittent.

## API Documentation

This project uses Swagger for interactive API documentation. Once the server is running, you can view and interact with all the API endpoints by navigating to:

[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

The documentation is automatically generated from JSDoc comments in the `src/routes/` files, ensuring that it is always in sync with the code.
