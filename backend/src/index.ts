import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = Number(process.env.PORT) || 3001

export default {
  port,
  fetch: app.fetch,
}
