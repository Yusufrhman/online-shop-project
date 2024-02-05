// ini bukan front end javascript, jangan di hapus/diotak atik
const db = require("../data/database");
const User = require("../models/user.model");
const authentication = require("../util/authentication");
const validation = require("../util/validation");

function getSignup(req, res) {
  let signupData = req.session.signupData;
  if (!signupData) {
    signupData = {};
  }
  req.session.signupData = null;
  res.render("customer/auth/signup", { signupData });
}
async function signup(req, res, error) {
  const enteredUsername = req.body.username;
  const enteredEmail = req.body.email;
  const enteredConfirmEmail = req.body["confirm-email"];
  const enteredPassword = req.body.password;
  const signupIsNotValid = await validation.signUpIsNotValid(
    enteredUsername,
    enteredEmail,
    enteredConfirmEmail,
    enteredPassword
  );
  if (signupIsNotValid) {
    req.session.signupData = {
      username: enteredUsername,
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      message: signupIsNotValid,
    };
    req.session.save(res.redirect("/signup"));
    return;
  }
  const user = new User(enteredUsername, enteredEmail, enteredPassword);
  try {
    await user.signup();
  } catch (error) {
    return next(error);
  }
  res.redirect("/login");
}

function getLogin(req, res) {
  let loginData = req.session.loginData;
  if (!loginData) {
    loginData = {};
  }
  req.session.loginData = null;
  res.render("customer/auth/login", { loginData });
}
async function login(req, res, next) {
  const enteredUsernameOrEmail = req.body["username-email"];
  const enteredPassword = req.body.password;
  const user = new User(
    enteredUsernameOrEmail,
    enteredUsernameOrEmail,
    enteredPassword
  );
  let findUser;
  try {
    findUser = await user.findUser();
  } catch (error) {
    return next(error);
  }
  if (!findUser) {
    req.session.loginData = {
      usernameOrEmail: enteredUsernameOrEmail,
      message: "account do not exist!",
    };
    return req.session.save(res.redirect("/login"));
  }
  const passwordIsCorrect = await user.checkPassword(findUser.password);
  if (!passwordIsCorrect) {
    req.session.loginData = {
      password: enteredPassword,
      message: "wrong password!",
    };
    return req.session.save(res.redirect("/login"));
  }
  authentication.createUserSession(req, enteredUsernameOrEmail);
  req.session.save(res.redirect("/account"));
}

function logout(req, res) {
  req.session.username = null;
  req.session.cart = null;
  req.session.save(res.redirect("/login"));
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
