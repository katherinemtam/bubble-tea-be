import { Router } from 'express';
import Topping from '../models/Topping.js';

export default Router()
  .post('/', async (req, res, next) => {
    try{
      const topping = await Topping.insert(req.body);
      res.send(topping);

    } catch(err) {
      next(err);
    }
  })
  
  .get('/', async (req, res, next) => {
    try{
      const toppings = await Topping.findAll();
      res.send(toppings);

    } catch(err) {
      next(err);
    }
  })

// .get('/:id', async(req, res, next) => {
//   try {
//     const topping = await Topping.findById(req.params.id);
//     res.send(topping);

//   } catch(err) {
//     next(err);
//   }
// })

// .put('/:id', async(req, res, next) => {
//   try{
//     const topping = await Topping.update(req.body, req.params.id);
//     res.send(topping);

//   } catch(err) {
//     next(err);
//   }
// })
  
// .delete('/:id', async(req, res, next) => {
//   try{
//     const topping = await Topping.delete(req.params.id);
//     res.send(topping);

//   } catch(err) {
//     next(err);
//   }
// }) 
;
