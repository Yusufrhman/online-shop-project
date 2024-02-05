// ini bukan front end javascript, jangan di hapus/diotak atik
const express = require("express");

const csrf = require("csurf");

const addCsrfTokenMiddleWare = require("./middlewares/csrf-token");
const authStatusMiddleware = require("./middlewares/check-auth");
const routesProtectionMiddleware = require("./middlewares/routes-protect");
const cartMiddleware = require("./middlewares/cart");

const session = require("express-session");

const createSessionConfig = require("./config/session");

const app = express();

const path = require("path");

const db = require("./data/database");

const authRoutes = require("./routes/auth.routes");
const baseRoutes = require("./routes/base.routes");
const custRoutes = require("./routes/customer.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");

const handleErrors = require("./middlewares/error-handler");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("products-data"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(session(sessionConfig));

app.use(csrf());

app.use(addCsrfTokenMiddleWare);
app.use(authStatusMiddleware);
app.use(cartMiddleware);
app.use(baseRoutes);
app.use(authRoutes);
app.use("/cart", cartRoutes);
app.use(routesProtectionMiddleware);
app.use(custRoutes);
app.use("/admin", adminRoutes);

app.use(function (req, res) {
  res.status(404).render("shared/404");
});

app.use(handleErrors);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("failed to connect to the database");
    console.log(error);
  });
