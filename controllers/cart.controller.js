// ini bukan front end javascript, jangan di hapus/diotak atik
const mongodb = require("mongodb");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

async function getCart(req, res, next) {
  const newCart = {};
  const sessionCart = req.session.cart;
  newCart.totalQuantity = sessionCart.totalQuantity;
  let productIds = sessionCart.items.map((item) => item.productId);
  newCart.items = await Cart.getSessionCartItems(productIds);
  for (let i = 0; i < newCart.items.length; i++) {
    newCart.items[i].productId = newCart.items[i]._id;
    for (let j = 0; j < sessionCart.items.length; j++) {
      if (
        newCart.items[i]._id.toString() ===
        sessionCart.items[j].productId.toString()
      ) {
        newCart.items[i].quantity = sessionCart.items[j].quantity;
      }
    }
  }
  res.render("customer/cart/cart", { cart: newCart });
}

async function addCartItem(req, res, next) {
  const productId = new mongodb.ObjectId(req.body.productId);
  const cart = req.session.cart;
  cart.addItem(productId);
  if (res.locals.isLoggedIn) {
    const user = res.locals.user;
    try {
      await Cart.addCart(user._id, cart);
    } catch (error) {
      return next(error);
    }
  }
  req.session.cart = cart;
  res.json({
    message: "cart updated",
    newTotalItems: cart.totalQuantity,
  });
}
async function updateCart(req, res, next) {
  const productId = new mongodb.ObjectId(req.body.productId);
  const cart = req.session.cart;
  const newQuantity = +req.body.newQuantity;
  if (newQuantity <= 0) {
    cart.deleteItem(productId);
  } else {
    cart.updateItem(productId, newQuantity);
  }
  if (res.locals.isLoggedIn) {
    const user = res.locals.user;
    try {
      await Cart.addCart(user._id, cart);
    } catch (error) {
      return next(error);
    }
  }
  res.json({
    message: "cart updated",
    newTotalItems: cart.totalQuantity,
  });
}
module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCart: updateCart,
};
