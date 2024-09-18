// src/swagger.js

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.1.0', // OpenAPI version
        info: {
            title: 'Node Js API Project',
            version: '1.0.0'
            
        },
        servers:[
            {
                url: 'http://localhost:4000', // Your server URL
            }
        ]
    },
    apis:["./routes/*.js"]
    // Path to your route files
}

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);


module.exports = { swaggerUi, swaggerSpec }; // Export the modules
