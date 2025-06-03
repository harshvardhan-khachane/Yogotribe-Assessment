import { test } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../index.js';
import { isPrime } from '../index.js';

test('Prime Number API', async (t) => {
  await t.test('isPrime function - prime numbers', () => {
    assert.strictEqual(isPrime(2), true);
    assert.strictEqual(isPrime(17), true);
    assert.strictEqual(isPrime(7919), true);
  });

  await t.test('isPrime function - non-prime numbers', () => {
    assert.strictEqual(isPrime(0), false);
    assert.strictEqual(isPrime(1), false);
    assert.strictEqual(isPrime(4), false);
    assert.strictEqual(isPrime(100), false);
  });

  await t.test('GET /api/is-prime - valid prime', async () => {
    const response = await request(app).get('/api/is-prime?number=17');
    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.body, { number: 17, isPrime: true });
  });

  await t.test('GET /api/is-prime - valid non-prime', async () => {
    const response = await request(app).get('/api/is-prime?number=9');
    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.body, { number: 9, isPrime: false });
  });

  await t.test('GET /api/is-prime - missing parameter', async () => {
    const response = await request(app).get('/api/is-prime');
    assert.strictEqual(response.status, 400);
    assert.deepStrictEqual(response.body, { error: "Missing required parameter: 'number'" });
  });

  await t.test('GET /api/is-prime - non-integer input', async () => {
    const response = await request(app).get('/api/is-prime?number=abc');
    assert.strictEqual(response.status, 400);
    assert.deepStrictEqual(response.body, { error: "Input must be an integer" });
  });

  await t.test('GET /api/is-prime - negative number', async () => {
    const response = await request(app).get('/api/is-prime?number=-5');
    assert.strictEqual(response.status, 400);
    assert.deepStrictEqual(response.body, { error: "Input must be a non-negative integer" });
  });
});