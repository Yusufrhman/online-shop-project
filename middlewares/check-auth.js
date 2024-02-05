// ini bukan front end javascript, jangan di hapus/diotak atik
const User = require("../models/user.model");
async function checkAuthStatus(req, res, next) {
  const username = req.session.username;
  if (!username) {
    return next();
  }
  const user = new User(username, username);
  res.locals.user = await user.findUser();
  res.locals.isAdmin = res.locals.user.isAdmin;
  res.locals.isLoggedIn = true;
  next();
}

module.exports = checkAuthStatus;
