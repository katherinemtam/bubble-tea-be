/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import toppings from './toppings.js';

run();

async function run() {

  try {
    await Promise.all(
      toppings.map(topping => {
        return client.query(`
          INSERT INTO toppings (name, description, image, texture, has_dairy, cost)
          VALUES ($1, $2, $3, $4, $5, $6);
        `, [topping.name, topping.description, topping.image, topping.texture, topping.hasDairy, topping.cost]);
      })
    );

    console.log('seed data load complete');
  }
  catch (err) {
    console.log(err);
  }
  finally {
    client.end();
  }
