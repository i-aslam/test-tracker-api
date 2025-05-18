const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi   = require('swagger-ui-express')

// swagger setup options
const options = {
  
  definition: {
    openapi: '3.0.0',
    
    info: {
      title: 'Test-Tracker-API by Ikram Aslam',
      version: '1.0.0',
      description: 'An authenticated API that lets students register and log in, to create, view, update, or delete their exam entries (course, date, time, location, weight, and result).'
    },
    
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  
  // path to the api route files
  apis: ['./routes/*.js']
}

// generate swagger specs from the options
const specs = swaggerJsDoc(options)

module.exports = {
  swaggerUi,
  specs
}
