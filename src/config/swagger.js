const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Workout Logger API',
      version: '1.0.0',
      description: 'API documentation for the Bolder.fit offline-first workout logger application. This API handles user authentication, data synchronization, and provides access to the exercise database.',
      contact: {
        name: 'API Support',
        url: 'https://bolder.fit',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // Error Schema
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'A message describing the error.',
            },
          },
        },
        // Auth Schemas
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60c72b2f9b1d8c001f8e4b2a' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            token: { type: 'string', description: 'JWT authentication token' },
          },
        },
        RegisterUser: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Jane Doe' },
            email: { type: 'string', format: 'email', example: 'jane@example.com' },
            password: { type: 'string', format: 'password', example: 'password123' },
          },
        },
        LoginUser: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'jane@example.com' },
            password: { type: 'string', format: 'password', example: 'password123' },
          },
        },
        // Data Schemas
        Category: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', example: 'Chest' },
          },
        },
        Exercise: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', example: 'Bench Press' },
            category: { $ref: '#/components/schemas/Category' },
            description: { type: 'string', nullable: true },
            videoUrl: { type: 'string', nullable: true },
          },
        },
        Set: {
            type: 'object',
            properties: {
                reps: { type: 'number', example: 10 },
                weight: { type: 'number', example: 135 },
            }
        },
        PerformedExercise: {
            type: 'object',
            properties: {
                exercise: { type: 'string', description: 'ObjectId of the exercise' },
                sets: { type: 'array', items: { $ref: '#/components/schemas/Set' } },
            }
        },
        WorkoutSession: {
            type: 'object',
            properties: {
                _id: { type: 'string', readOnly: true },
                clientId: { type: 'string', description: 'Client-generated UUID', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' },
                user: { type: 'string', readOnly: true },
                startTime: { type: 'string', format: 'date-time' },
                endTime: { type: 'string', format: 'date-time' },
                notes: { type: 'string' },
                performedExercises: { type: 'array', items: { $ref: '#/components/schemas/PerformedExercise' } },
                lastModifiedAt: { type: 'string', format: 'date-time', description: 'Crucial for conflict resolution' },
            }
        },
        // Sync Schemas
        SyncPayload: {
            type: 'object',
            properties: {
                changes: {
                    type: 'object',
                    properties: {
                        workoutSessions: {
                            type: 'object',
                            properties: {
                                created: { type: 'array', items: { $ref: '#/components/schemas/WorkoutSession' } },
                                updated: { type: 'array', items: { $ref: '#/components/schemas/WorkoutSession' } },
                                deleted: { type: 'array', items: { type: 'string', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' } },
                            }
                        },
                        // Add workoutTemplates here if needed
                    }
                }
            }
        },
        SyncResult: {
            type: 'object',
            properties: {
                clientId: { type: 'string' },
                status: { type: 'string', enum: ['SUCCESS', 'ERROR', 'CONFLICT', 'NOT_FOUND'] },
                serverId: { type: 'string', nullable: true, description: 'The new server-generated _id for created items' },
                message: { type: 'string', nullable: true },
                serverRecord: { $ref: '#/components/schemas/WorkoutSession', nullable: true, description: 'The server\'s version of the record in case of a conflict' }
            }
        },
        SyncResponse: {
            type: 'object',
            properties: {
                syncResults: {
                    type: 'object',
                    properties: {
                        workoutSessions: {
                            type: 'object',
                            properties: {
                                created: { type: 'array', items: { $ref: '#/components/schemas/SyncResult' } },
                                updated: { type: 'array', items: { $ref: '#/components/schemas/SyncResult' } },
                                deleted: { type: 'array', items: { $ref: '#/components/schemas/SyncResult' } },
                            }
                        }
                    }
                },
                latestData: {
                    type: 'object',
                    properties: {
                        sessions: { type: 'array', items: { $ref: '#/components/schemas/WorkoutSession' } },
                        templates: { type: 'array', items: { type: 'object' } } // Define template schema if needed
                    }
                }
            }
        }
      }
    },
  },
  // Path to the API docs
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;