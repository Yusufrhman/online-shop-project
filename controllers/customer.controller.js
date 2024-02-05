// ini bukan front end javascript, jangan di hapus/diotak atik
const Account = require("../models/account.model");
const validation = require("../util/validation");

function getAccount(req, res) {
  let accountUpdateData = req.session.accountUpdateData;
  
  if (!accountUpdateData) {
    accountUpdateData = {};
  }
  req.session.accountUpdateData = null;
  res.render("shared/my-account", { accountUpdateData: accountUpdateData });
}
async function saveAccount(req, res, next) {
  const user = res.locals.user;
  const id = user._id;
  const enteredUsername = req.body.username;
  const enteredEmail = req.body.email;
  const address = {
    address: req.body.address,
    postalCode: req.body["postal-code"],
    city: req.body.city,
    province: req.body.province,
  };
  const accountIsNotValid = await validation.accountIsNotValid(
    enteredUsername,
    enteredEmail,
    user.username,
    user.email
  );
  if (accountIsNotValid) {
    req.session.accountUpdateData = {
      message: accountIsNotValid,
    };
    res.redirect("/account");
    return;
  }
  const account = new Account(id, enteredUsername, enteredEmail, address);
  try {
    await account.updateAccount();
  } catch (error) {
    return next(error);
  }
  res.redirect("/account");
}

module.exports = {
  getAccount: getAccount,
  saveAccount: saveAccount,
};
