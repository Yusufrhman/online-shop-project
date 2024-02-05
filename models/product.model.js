// ini bukan front end javascript, jangan di hapus/diotak atik
const db = require("../data/database");
const mongodb = require("mongodb");
class Product {
  constructor(productData) {
    (this.title = productData.title),
      (this.summary = productData.summary),
      (this.price = +productData.price),
      (this.description = productData.description),
      (this.image = productData.image),
      (this.imagePath = `products-data/images/${productData.image}`),
      (this.imageUrl = `products/assets/images/${productData.image}`),
      (this.id = productData._id);
  }
  static async findAll() {
    const productList = await db
      .getDb()
      .collection("products")
      .find()
      .toArray();
    return productList.map(function (productData) {
      return new Product(productData);
    });
  }
  static async findSome(query) {
    const productList = await db
      .getDb()
      .collection("products")
      .find({ title: new RegExp(query, "i") })
      .toArray();
    return productList.map(function (productData) {
      return new Product(productData);
    });
  }

  static async findOne(id) {
    let productId;
    try {
      productId = new mongodb.ObjectId(id);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: productId });
    if (!product) {
      const error = new Error("couldn't find product with this id");
      error.code = 404;
      throw error;
    }
    return new Product(product);
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    try {
      await db.getDb().collection("products").insertOne(productData);
    } catch (error) {
      return next(error);
    }
  }
  async update() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    if (!productData.image) {
      delete productData.image;
    }
    try {
      await db
        .getDb()
        .collection("products")
        .updateOne(
          { _id: new mongodb.ObjectId(this.id) },
          { $set: productData }
        );
    } catch (error) {
      return next(error);
    }
  }
  static delete(id) {
    const productId = new mongodb.ObjectId(id);
    return db.getDb().collection("products").deleteOne({ _id: productId });
  }
}

module.exports = Product;
