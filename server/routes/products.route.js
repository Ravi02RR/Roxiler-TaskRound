const express = require('express')
const { getData, getStats, getPriceRangeStats,getUniqueCategories } = require('./../controller/product.controller')

const ProductRouter = express.Router()



ProductRouter.get('/get-products', getData)
ProductRouter.get('/get-stats', getStats)
ProductRouter.get('/get-price-range-stats', getPriceRangeStats)
ProductRouter.get('/get-unique-categories', getUniqueCategories)


module.exports = ProductRouter;