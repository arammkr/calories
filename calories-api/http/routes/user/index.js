const { userAddValidator, userUpdateValidator, userSearchValidator, dateRangeValidator, userDailyMealValidator } = require('@http/validators');
const { validatorMiddleware, aclMiddleware, userGetterMiddlware } = require('@http/middlewares');
const UserController = require('@http/controllers/user');
const { Router } = require('express');
const router = Router();

router.get('/search', validatorMiddleware(userSearchValidator, req => req.query), UserController.search);
router.post('/', aclMiddleware, validatorMiddleware(userAddValidator), UserController.create);
router.get('/all', aclMiddleware, UserController.getUsers);
router.put('/:id',  aclMiddleware, validatorMiddleware(userUpdateValidator), userGetterMiddlware, UserController.update);
router.get('/:id', userGetterMiddlware, UserController.get);
router.delete('/:id', aclMiddleware, userGetterMiddlware, UserController.delete);
router.get('/:id/meals', validatorMiddleware(dateRangeValidator, req => req.query), userGetterMiddlware, UserController.meals);
router.get('/:id/meals/nutritionAverage', validatorMiddleware(dateRangeValidator, req => req.query), userGetterMiddlware, UserController.nutritionAverage);
router.get('/:id/meals/:date', validatorMiddleware(userDailyMealValidator, req => req.params), userGetterMiddlware, UserController.getMealsForSpecificDay);

module.exports = router;
