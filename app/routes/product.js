const Product = require('./../controllers/product')
const auth = require('./../controllers/auth')
const multer = require('multer')

var storage = multer.diskStorage(
  {
      destination: 'uploads/produtos',
      filename: function ( req, file, cb ) {
          cb( null, Date.now()+'.jpg');
      }
  }
)

const upload = multer({storage})

module.exports = function(app) {
  app.route('/products/:categoryId?')
    .get((req, res) => {
      if(req.query.categoryId) Product.findProductsByCategoryId(req, res)
      else Product.getAllProducts(req, res)
    })

  app.route('/products/categories/:categoryId')
    .get(Product.findProductsByCategoryId)
    
  app.route('/product?')
    .get(Product.getProductbyID)

  app.route('/new_product')
    .post(auth.protectRoute, upload.single('imagem'), Product.addProduct)

  app.route('/categories')
    .get(Product.getAllCategories)
}