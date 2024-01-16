import {app} from '../src/server'; // Import your Koa.js app instance

function base() { return 'http://localhost:5000' }

describe('GET /', () => {
  it('should have status 200', async () => {
    const response = await fetch(`${base()}/`);
    expect(response.status).toBe(200);
  });
});


describe('GET /address/balance', () => {
  it('balance should be a number', async () => {

    const address = "123"
    const response = await fetch(`${base()}/address/${address}/balance`);
    expect(response.status).toBe(200);

    const body = await response.json()

    expect(typeof body.balance).toBe('number');
  });
});