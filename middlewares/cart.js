// ini bukan front end javascript, jangan di hapus/diotak atik
const Cart = require("../models/cart.model");
function initializeCart(req, res, next) {
  let cart;
  if (res.locals.isLoggedIn) {
    userCart = res.locals.user.cart
    cart = new Cart(userCart.items, userCart.totalQuantity);
  } else {
    if (!req.session.cart) {
      cart = new Cart();
    } else {
      const sessionCart = req.session.cart;
      cart = new Cart(sessionCart.items, sessionCart.totalQuantity)
    }
  }
  req.session.cart = cart
  res.locals.cart = cart
  next()
}
module.exports = initializeCart;
