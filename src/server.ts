import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger'

import {Service} from"./service";

// Config
const PORT: number = Number(process.env.PORT) || 5000;

// Create server
const app = new Koa();
const router = new Router();

// Middleware
// Parse request bodies as JSON
app.use(logger())
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// Routes
router.get('/', async (ctx) => {
  ctx.body = 'success'
});

router.get('/address/:address/balance', async (ctx) => {
  console.log("get balance")
  console.log({params: ctx.params})

  const address = ctx.params.address

  ctx.body = { balance:  await Service.getBalance(address) }
});

router.get('/address/:address/transactions', async (ctx) => {
  console.log("get transactions")
  console.log({params: ctx.params})

  const address = ctx.params.address

  ctx.body = { transactions:  await Service.getTransactions(address) }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});