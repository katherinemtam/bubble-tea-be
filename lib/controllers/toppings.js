import { Router } from 'express';
import Topping from '../models/Topping';

export default Router()
  .post('/', async (req, res, next) => {
    try{
      const topping = await Topping.insert(req.body);
      res.send(topping);

    } catch(err) {
      next(err);
    }
  })
;