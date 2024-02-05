// ini bukan front end javascript, jangan di hapus/diotak atik
const mongodb = require("mongodb");
const Product = require("../models/product.model");

async function getManageProducts(req, res, next) {
  let products;
  let query = req.query.search_query;
  if (!query) {
    query = "";
  }
  try {
    products = await Product.findSome(query);
  } catch (error) {
    return next(error);
  }
  res.render("admin/manage-products", { products, query });
}

function getNewProducts(req, res) {
  res.render("admin/new-products");
}

async function createNewProduct(req, res) {
  const input = req.body;
  const product = new Product({
    ...input,
    image: req.file.filename,
  });
  await product.save();
  res.redirect("/admin/products");
}

async function getUpdateProducts(req, res, next) {
  const id = req.params.id;
  if (!mongodb.ObjectId.isValid(id)) {
    return res.status(404).render("shared/404");
  }
  let product;
  try {
    product = await Product.findOne(id);
  } catch (error) {
    next(error);
  }
  res.render("admin/update-products", { product });
}

async function updateProducts(req, res, next) {
  let image;
  if (req.file) {
    image = req.file.filename;
  }
  const product = new Product({
    ...req.body,
    image: image,
    _id: req.params.id,
  });

  try {
    await product.update();
  } catch (error) {
    return next(error);
  }
  res.redirect("/admin/products");
}
async function deleteProduct(req, res, next) {
  const productId = req.params.id;
  await Product.delete(productId);
  res.json({ message: "delete succesfull" });
}
module.exports = {
  getManageProducts: getManageProducts,
  getNewProducts: getNewProducts,
  createNewProduct: createNewProduct,
  getUpdateProducts: getUpdateProducts,
  updateProducts: updateProducts,
  deleteProduct: deleteProduct,
};
