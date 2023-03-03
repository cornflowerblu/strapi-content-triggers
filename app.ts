import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

require('dotenv').config()

import healthCheckRouter from './routes/health'
import syncRouter from './routes/content'

export const app = express()

app.use(logger('short'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/health', healthCheckRouter)
app.use('/content/sync', syncRouter)

console.log(`Listening on port ${process.env.PORT}`)

module.exports = app
