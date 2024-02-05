// ini bukan front end javascript, jangan di hapus/diotak atik

const db = require("../data/database");
class Cart {
  constructor(items = [], totalQuantity = 0) {
    (this.items = items), (this.totalQuantity = totalQuantity);
  }
  addItem(productId) {
    const cartItem = {
      productId: productId,
      quantity: 1,
    };
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.productId.toString() === productId.toString()) {
        cartItem.quantity += this.items[i].quantity;
        this.items[i] = cartItem;
        this.totalQuantity++;
        return;
      }
    }
    this.items.push(cartItem);
    this.totalQuantity++;
  }
  updateItem(productId, newQuantity) {
    const cartItem = {
      productId: productId,
      quantity: newQuantity,
    };
    let quantityRatio;
    for (let i = 0; i < this.items.length; i++) {
      if (productId.toString() === this.items[i].productId.toString()) {
        quantityRatio = newQuantity - this.items[i].quantity;
        this.items[i] = cartItem;
      }
    }
    this.totalQuantity += quantityRatio;
  }
  deleteItem(productId) {
    for (let i = 0; i < this.items.length; i++) {
      if (productId.toString() === this.items[i].productId.toString()) {
        this.totalQuantity -= this.items[i].quantity;
        this.items.splice(i, 1);
        console.log(this.items)
      }
    }
  }
  static async addCart(userId, cart) {
    await db
      .getDb()
      .collection("users")
      .updateOne(
        { _id: userId },
        {
          $set: {
            cart: cart,
          },
        }
      );
  }
  static async getSessionCartItems(productIds) {
    return await db
      .getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .project({ description: 0, summary: 0 })
      .toArray();
  }
}
module.exports = Cart;
