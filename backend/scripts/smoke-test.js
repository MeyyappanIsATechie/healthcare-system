const assert = require("assert");

process.env.JWT_SECRET = process.env.JWT_SECRET || "smoke-test-secret";

const { app } = require("../index");
const { generateToken, signToken } = require("../utils/jwt");

assert(app, "Express app should be exported");
assert.strictEqual(typeof generateToken, "function", "generateToken should be exported");
assert.strictEqual(signToken, generateToken, "signToken should alias generateToken");

const token = generateToken({ userId: "000000000000000000000001", role: "patient" });
assert.strictEqual(typeof token, "string", "generateToken should return a JWT string");

const server = app.listen(0, async () => {
  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/`);
    const text = await response.text();

    assert.strictEqual(response.status, 200, "health endpoint should return HTTP 200");
    assert.strictEqual(text, "Healthcare Backend is running!");

    console.log("Smoke test passed");
    server.close();
  } catch (err) {
    server.close(() => {
      throw err;
    });
  }
});
