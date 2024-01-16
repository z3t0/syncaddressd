import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';


// Config
const PORT: number = Number(process.env.PORT) || 5000;

// Create server
const app = new Koa();
const router = new Router();

// Middleware
// Parse request bodies as JSON
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// Routes
router.get('/', async (ctx) => {
  ctx.body = 'Hello, world';
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});