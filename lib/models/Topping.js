import pool from "../utils/pool.js";

export default class Topping {
  id;
  name;
  description;
  image;
  texture
  hasDairy;
  cost;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.description = row.description;
    this.image = row.image;
    this.texture = row.texture;
    this.hasDairy = row.has_dairy;
    this.cost = Number(row.cost);
  }

  static async insert({name, description, image, texture, hasDairy, cost}) {
    const {rows} = await pool.query(`
    INSERT INTO toppings (name, description, image, texture, has_dairy, cost)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `, [name, description, image, texture, hasDairy, cost]);

    return new Topping(rows[0]);
  }

  static async findAll() {
    const {rows} = await pool.query(`
      SELECT *
      FROM toppings
    `);

    return rows.map(row => new Topping(row));
  }

  static async findById(id) {
    const {rows} = await pool.query(`
      SELECT *
      FROM toppings
      WHERE id = $1
    `, [id]);

    return new Topping(rows[0])
  }

  static async update(topping, id) {
    const {rows} = await pool.query(`
      UPDATE toppings
      SET name = $1,
          description = $2,
          image = $3,
          texture = $4,
          has_dairy = $5,
          cost = $6
      WHERE id = $7
      RETURNING *  
    `, [topping.name, topping.description, topping.image, topping.texture, topping.hasDairy, topping.cost, id]);

    return new Topping(rows[0]);
  }

  static async delete(id) {
    const {rows} = await pool.query(`
      DELETE FROM toppings
      WHERE id = $1
      RETURNING *
    `, [id])

    return new Topping(rows[0]);
  }
};
