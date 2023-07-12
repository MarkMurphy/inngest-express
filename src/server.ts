import dotenv from 'dotenv'
import express from 'express'
import { Inngest, RegisterOptions } from 'inngest'
import { serve } from 'inngest/express'

dotenv.config()

const inngest = new Inngest({
  name: 'Test App',
})

const hello = inngest.createFunction(
  { name: 'Hello World' },
  { event: 'test/hello.world' },
  async ({ event }) => {
    const name = event.data?.name?.trim() ?? 'World'
    return { event, body: `Hello, ${name}!` }
  }
)

const app = express()
const port = process.env.PORT ?? 3000

// Log all incoming requests
app.use((req, res, next) => {
  const datetime = new Date()
  const [timestamp] = datetime.toLocaleTimeString().split(' ')
  console.info(`[INFO]`, timestamp, req.method, req.url)
  next()
})

app.use(express.json())

// create a basic health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).send({ status: 'ok' })
})

app.use(
  '/api/inngest',
  serve(inngest, [hello], {
    // When running in a container, the default fetch implementation seems to
    // cause the process to exit unexpectedly in Docker for Mac v4.19.0 or above.
    // Uncomment the following line to use node-fetch instead:
    // fetch: require('node-fetch') as unknown as RegisterOptions['fetch'],
    logLevel: 'debug',
  })
)

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

process.on('SIGTERM', () => {
  console.debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.debug('HTTP server closed')
  })
})
