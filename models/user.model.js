// ini bukan front end javascript, jangan di hapus/diotak atik
const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    db.getDb()
      .collection("users")
      .insertOne({
        username: this.username,
        email: this.email,
        password: hashedPassword,
        address: {},
        cart: { items: [], totalQuantity: 0 },
        isAdmin: false
      });
  }
  async findUser() {
    const user = await db
      .getDb()
      .collection("users")
      .findOne({
        $or: [{ username: this.username }, { email: this.email }],
      });
    return user;
  }
  async checkPassword(hashedPassword) {
    const passwordIsCorrect = await bcrypt.compare(
      this.password,
      hashedPassword
    );
    return passwordIsCorrect;
  }
}

module.exports = User;
