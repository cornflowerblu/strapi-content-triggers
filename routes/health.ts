import express, { Request, Response } from 'express'
const healthCheckRouter = express.Router()

healthCheckRouter.get('/', (req: Request, res: Response) => {
  res.json({
    timestamp: Date.now(),
    status: res.statusCode,
  })
})

export default healthCheckRouter
