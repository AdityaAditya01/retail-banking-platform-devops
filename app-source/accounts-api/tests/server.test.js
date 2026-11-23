const { test, before, after } = require("node:test");
const assert = require("node:assert");
const { createServer } = require("../server");

let server;
let baseUrl;

before(async () => {
  server = createServer();

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test("GET /health should return service UP", async () => {
  const response = await fetch(`${baseUrl}/health`);
  const body = await response.json();

  assert.strictEqual(response.status, 200);
  assert.deepStrictEqual(body, {
    status: "UP",
    service: "accounts-api"
  });
});

test("GET /accounts should return account list", async () => {
  const response = await fetch(`${baseUrl}/accounts`);
  const body = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(body.length, 3);
  assert.strictEqual(body[0].id, "101");
  assert.strictEqual(body[0].balance, 25000);
});

test("GET /invalid should return 404", async () => {
  const response = await fetch(`${baseUrl}/invalid`);
  const body = await response.json();

  assert.strictEqual(response.status, 404);
  assert.deepStrictEqual(body, {
    error: "Endpoint not found"
  });
});