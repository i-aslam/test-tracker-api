// load environment variables
require('dotenv').config()

const express   = require('express')
const cors      = require('cors')

const connectDB = require('./config/db')

// import route handlers
const authRoutes = require('./routes/authRoutes')
const examRoutes = require('./routes/examRoutes')

// import swagger ui and specs
const { swaggerUi, specs } = require('./swagger')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

// serve swagger ui at /docs with topbar hidden
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss: `
      .swagger-ui .topbar {
        display: none !important;
      }
    `,
    customSiteTitle: 'Docs for test-tracker-api'
  })
)

// mount auth and exam routes
app.use('/api/auth', authRoutes)
app.use('/api/exams', examRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'test tracker api running' })
})

// start server on configured port
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`server on port ${PORT}`)
})
