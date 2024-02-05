// ini bukan front end javascript, jangan di hapus/diotak atik
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongodbStore(session);
  const store = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "online-shop",
    collection: "sessions",
  });
  return store;
}

function createSessionConfig() {
  return {
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 6000000,
    },
  };
}

module.exports = createSessionConfig;
