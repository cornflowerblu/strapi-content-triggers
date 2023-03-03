import express, { Request, response, Response } from 'express'
import axios, { AxiosResponse } from 'axios'

const syncRouter = express.Router()

syncRouter.post('/', async (req: Request, res: Response) => {
  const authHeader = req.header('x-webhook-key')
  const cmsHeader = req.header('x-strapi-event')
  if (authHeader !== process.env.WEBHOOK_KEY)
    return res.status(401).json({
      message: 'Unauthorized',
      status: res.statusCode,
    })

  if (cmsHeader === 'entry.publish' || cmsHeader === 'entry.unpublish') {
    const data = JSON.stringify({
      ref: 'content',
    })

    const config = {
      method: 'post',
      url: 'https://api.github.com/repos/cornflowerblu/sunny-nextjs/actions/workflows/content.yml/dispatches',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      data: data,
    }

    try {
      await axios(config)
      return res.status(200).json({
        message: 'Success',
        data: (response: AxiosResponse) => response.data,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error',
        data: (response: AxiosResponse) => response.data,
      })
    }
  } else {
    return res.status(500).json({
      message: 'Error',
      data: 'Not a publish or unpublish event',
    })
  }

})

export default syncRouter
