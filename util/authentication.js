// ini bukan front end javascript, jangan di hapus/diotak atik
function createUserSession(req, user, action) {
  req.session.username = user;
  req.session.save(action);
}
module.exports = { createUserSession: createUserSession };
