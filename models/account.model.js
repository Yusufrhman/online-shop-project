// ini bukan front end javascript, jangan di hapus/diotak atik
const db = require("../data/database");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class Account {
  constructor(id, username, email, address) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.address = address;
  }
  async updateAccount() {
    await db
      .getDb()
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this.id) },
        {
          $set: {
            address: this.address,
            username: this.username,
            email: this.email,
          },
        }
      );
  }
}
module.exports = Account;
