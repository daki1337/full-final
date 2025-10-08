const express = require('express');
const { categorySchema } = require('../validators/category.validator');
const { auth, isAdmin } = require('../middlewares/auth.mw');
const { createCategory, getAllCategories, getCategoryById, 
  deleteCategoryById, updateCategoryById } = require('../controllers/category.controller');
const { validate } = require('../middlewares/validate.mw');
const router = express.Router();
router.get('/', getAllCategories);
router.get('/:idCategory', getCategoryById);

router.post('/', auth, isAdmin, validate(categorySchema), createCategory);
router.patch('/:idCategory', auth, isAdmin, validate(categorySchema), updateCategoryById);
router.delete('/:idCategory', auth, isAdmin, deleteCategoryById);

module.exports = router;
