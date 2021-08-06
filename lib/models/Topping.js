import pool from "../utils/pool";

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
    this.texture = row.texture.
    this.hasDairy = row.has_dairy;
    this.cost = row.cost;
  }

  static async insert({name, description, image, texture, hasDairy, cost}) {
    const {rows} = await pool.query(`
      INSERT INTO toppings (name, description, image, texture has_dairy, cost)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, description, image, texture, hasDairy, cost]);

    return new Topping(rows[0]);
  }
};
