const { Router } = require('express');
const { mealValidator } = require('@http/validators');
const MealController = require('@http/controllers/meal');
const router = Router();
const { 
  validatorMiddleware, 
  aclMiddleware, 
  mealGetterMiddleware, 
  isMealOwnerMiddlware,
} = require('@http/middlewares');

router.post('/', aclMiddleware, validatorMiddleware(mealValidator), MealController.create);
router.put('/:id', mealGetterMiddleware, isMealOwnerMiddlware, aclMiddleware, validatorMiddleware(mealValidator), MealController.update);
router.get('/:id', mealGetterMiddleware, MealController.get);
router.delete('/:id', mealGetterMiddleware, isMealOwnerMiddlware, aclMiddleware, MealController.delete);

module.exports = router;
