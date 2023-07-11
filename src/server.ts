import express from 'express'
import { Inngest } from 'inngest'
import { serve } from 'inngest/express'
import dotenv from 'dotenv'

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

app.use('/api/inngest', serve(inngest, [hello]))

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
