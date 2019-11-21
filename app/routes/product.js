const Product = require('./../controllers/product')
const auth = require('./../controllers/auth')

module.exports = function(app) {
  app.route('/products')
    .get(Product.getAllProducts)
  app.route('/category?')
    .get(Product.findProductByCategory)
    
  app.route('/product?')
    .get(Product.getProductbyID)

  app.route('/new_product')
    .get(auth.protectRoute, Product.addProduct)

  app.rout('/categories')
    .get(Product.getAllCategories)
}