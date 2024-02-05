// ini bukan front end javascript, jangan di hapus/diotak atik
const Product = require("../models/product.model");
function getHome(req, res, next) {
  return res.redirect("/products");
}
async function getAllProducts(req, res, next) {
  let products;
  try {
    products = await Product.findAll();
  } catch (error) {
    return next(error);
  }
  return res.render("customer/products/all-products", { products: products });
}
async function getProduct(req, res, next) {
  let productId = req.params.id;
  let product;
  try {
    product = await Product.findOne(productId);
  } catch (error) {
    return next(error);
  }
  return res.render("customer/products/product-details", { product: product });
}
function get403(req, res, next) {
  return res.render("shared/403");
}

module.exports = {
  get403: get403,
  getHome: getHome,
  getAllProducts: getAllProducts,
  getProduct: getProduct
};
