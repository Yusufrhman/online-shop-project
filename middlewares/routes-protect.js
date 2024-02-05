// ini bukan front end javascript, jangan di hapus/diotak atik

function protectRoutes(req, res, next) {
  if (!res.locals.isLoggedIn) {
    return res.status(401).redirect("/login");
  }
  if (!res.locals.isAdmin && req.path.startsWith("/admin")) {
    return res.status(403).redirect("/403");
  }
    next()
}
module.exports = protectRoutes;
