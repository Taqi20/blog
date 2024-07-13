import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono<{
  //initialization for ts
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

// app.use('/api/v1/blog/*', async (c, next) => {
//   await next()
// })

app.use('/*', cors())
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);


export default app
