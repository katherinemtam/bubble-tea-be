import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('topping routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const milkPudding = {
    name: 'Milk Pudding',
    description: 'Custard-like in taste and flavor, with a hint of milkiness.',
    image: 'https://i.ytimg.com/vi/uxtJKbXOlmg/hqdefault.jpg',
    texture: ['soft'],
    hasDairy: true,
    cost: 1,
  };

  test('creates a topping via POST', async () => {
    const res = await request(app)
      .post('/api/v1/toppings')
      .send(milkPudding);

    expect(res.body).toEqual({ id: '1', ...milkPudding });
  });
});
