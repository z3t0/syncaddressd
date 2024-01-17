import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger'

import * as Data from "./data";
import {Service} from"./data";


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

  const address = ctx.params.address
  console.log({params: ctx.params})
  ctx.body = { balance:  await Service.getBalance(address) }
});


export { app}