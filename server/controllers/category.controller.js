const createError = require('http-errors');
const Category = require('../models/Category');
const Product = require('../models/Product');

// Response handler wrapper
const handleResponse = (res, status, data) => res.status(status).send({ data });

// Error messages
const ERROR_MESSAGES = {
  NOT_FOUND: 'Category wasn`t found',
  ALREADY_EXISTS: 'Category is already exists',
  HAS_PRODUCTS: 'Category have products'
};

// Controller methods
const categoryController = {
  // Create new category
  async createCategory(req, res, next) {
    try {
      const category = await Category.create(req.body);
      handleResponse(res, 201, category);
    } catch (error) {
      if (error.code === 11000) {
        return next(createError(409, ERROR_MESSAGES.ALREADY_EXISTS));
      }
      next(error);
    }
  },

  // Get all categories
  async getAllCategories(req, res, next) {
    try {
      const categories = await Category.find();
      handleResponse(res, 200, categories);
    } catch (error) {
      next(error);
    }
  },

  // Get category by ID
  async getCategoryById(req, res, next) {
    try {
      const { idCategory } = req.params;
      const category = await Category.findById(idCategory).populate('products');
      
      if (!category) throw createError(404, ERROR_MESSAGES.NOT_FOUND);
      
      handleResponse(res, 200, category);
    } catch (error) {
      next(error);
    }
  },

  // Update category by ID
  async updateCategoryById(req, res, next) {
    try {
      const { idCategory } = req.params;
      const category = await Category.findByIdAndUpdate(
        idCategory,
        req.body,
        { new: true }
      );

      if (!category) throw createError(404, ERROR_MESSAGES.NOT_FOUND);
      
      handleResponse(res, 200, category);
    } catch (error) {
      if (error.code === 11000) {
        return next(createError(409, ERROR_MESSAGES.ALREADY_EXISTS));
      }
      next(error);
    }
  },

  // Delete category by ID
  async deleteCategoryById(req, res, next) {
    try {
      const { idCategory } = req.params;
      const products = await Product.find({ category: idCategory });
      
      if (products.length) {
        throw createError(409, ERROR_MESSAGES.HAS_PRODUCTS);
      }

      const category = await Category.findByIdAndDelete(idCategory);
      if (!category) throw createError(404, ERROR_MESSAGES.NOT_FOUND);
      
      handleResponse(res, 200, category);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = categoryController;
