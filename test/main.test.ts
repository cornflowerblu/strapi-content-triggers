import dotenv from 'dotenv'
dotenv.config()

const expect = require('chai').expect
const request = require('supertest')(
  `http://${process.env.TEST_HOST}:${process.env.PORT}`,
)

describe('Health check', () => {
  it('should return 200', async () => {
    const response = await request.get('/health')
    expect(response.status).to.be.greaterThanOrEqual(200).and.lessThan(299)
  })

  it('should return a timestamp that is not in the past', async () => {
    const response = await request.get('/health')
    expect(response.body.timestamp).to.be.greaterThan(Date.now() - 1000)
  })
})
