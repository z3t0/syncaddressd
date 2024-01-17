function base() { return 'http://localhost:5000' }

// Test data
const testAddr1 = "3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd"
const testAddr2 = "bc1q0sg9rdst255gtldsmcf8rk0764avqy2h2ksqs5"

describe('GET /', () => {
  it('should have status 200', async () => {
    const response = await fetch(`${base()}/`);
    expect(response.status).toBe(200);
  });
});


describe('GET /address/balance', () => {
  it('balance should be a number for testaddr1', async () => {

    const address = testAddr1;
    const response = await fetch(`${base()}/address/${address}/balance`);
    expect(response.status).toBe(200);

    const body = await response.json()

    expect(typeof body.balance).toBe('number');
  });


  it('balance should be a number for testaddr2', async () => {

    const address = testAddr2
    const response = await fetch(`${base()}/address/${address}/balance`);
    expect(response.status).toBe(200);

    const body = await response.json()

    expect(typeof body.balance).toBe('number');
  });
});

describe('GET /address/transactions', () => {
  it('transaction should be an array', async () => {

    const address = testAddr1
    const response = await fetch(`${base()}/address/${address}/transactions`);
    expect(response.status).toBe(200);

    const body = await response.json()

    expect(Array.isArray(body.transactions)).toBe(true)
  });
});