import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Topping from '../lib/models/Topping.js';

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

  const poppingBoba = {
    name: 'Popping Boba',
    description: 'Looks like boba, but bursts with flavored juice!',
    image: 'https://cdn.shopify.com/s/files/1/0479/3437/files/popboba.jpg?16437212153516682457',
    texture: ['liquid'],
    hasDairy: false,
    cost: 0.5,
  };

  test('creates a topping via POST', async () => {
    const res = await request(app)
      .post('/api/v1/toppings')
      .send(milkPudding);

    expect(res.body).toEqual({ id: '1', ...milkPudding });
  });

  test('gets all toppings via GET', async () => {
    const topping1 = await Topping.insert(milkPudding);
    const topping2 = await Topping.insert(poppingBoba);

    const res = await request(app)
      .get('/api/v1/toppings');

    expect(res.body).toEqual([topping1, topping2]);
  });

  test('gets a topping via GET', async() => {
    const topping = await Topping.insert(milkPudding);

    const res = await request(app)
      .get(`/api/v1/toppings/${topping.id}`);
    
    expect(res.body).toEqual(topping);
  });
});
