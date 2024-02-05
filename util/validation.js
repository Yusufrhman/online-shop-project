// ini bukan front end javascript, jangan di hapus/diotak atik
const User = require("../models/user.model");
function isEmpty(value) {
  return !value || value.trim() === "";
}
function checkEmail(email) {
  return email || email.includes("@");
}
function emailConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}
function checkPassword(password) {
  return password.trim().length >= 6;
}
async function userExist(usernameOrEmail) {
  const user = new User(usernameOrEmail, usernameOrEmail);
  let findUser;
  try {
    findUser = await user.findUser();
  } catch (error) {
    return next(error);
  }
  return findUser;
}
async function accountIsNotValid(
  enteredUsername,
  enteredEmail,
  username,
  email
) {
  let error;
  if (username !== enteredUsername) {
    const usernameExist = await userExist(enteredUsername);
    if (usernameExist) {
      error = "username is taken!";
    }
    if (isEmpty(enteredUsername)) {
      error = "please enter a valid username!";
    }
  }
  if (enteredEmail !== email) {
    const emailExist = await userExist(enteredEmail);
    if (emailExist) {
      error = "account with this email exist!";
    }
    if (isEmpty(enteredEmail) || !checkEmail(enteredEmail)) {
      error = "please enter a valid email!";
    }
  }
  return error;
}
async function signUpIsNotValid(username, email, confirmEmail, password) {
  let error;
  if (isEmpty(password) || !checkPassword(password)) {
    error = "Password must be atleast 6 characters!";
  }
  if (!emailConfirmed(email, confirmEmail)) {
    error = "Email do not match!";
  }
  const emailExist = await userExist(email);
  if (emailExist) {
    error = "account with this email exist!";
  }
  if (isEmpty(email) || !checkEmail(email)) {
    error = "please enter a valid email!";
  }
  const usernameExist = await userExist(username);
  if (usernameExist) {
    error = "username is taken!";
  }
  if (isEmpty(username)) {
    error = "please enter a valid username!";
  }
  return error;
}
module.exports = {
  signUpIsNotValid: signUpIsNotValid,
  accountIsNotValid: accountIsNotValid,
};
