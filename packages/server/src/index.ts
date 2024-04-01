import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import qs from 'query-string'
import { seed } from './seed'

const PORT = process.env.PORT || 8080

async function startServer() {
  seed({ recreateOnEveryRefresh: false })

  const app = setupExpressApp()

  app.listen(PORT, () => {
    console.log(`
        🚀  Server is running!
        📭  Port: ${PORT}
      `)
  })
}

startServer().catch(console.log)

function setupExpressApp() {
  const app = express()

  app.set('query parser', (str: string) => {
    return qs.parse(str, {
      arrayFormat: 'comma',
      parseBooleans: true,
      parseNumbers: true,
    })
  })

  app.use(cors())
  app.use(express.json())

  return app
}
