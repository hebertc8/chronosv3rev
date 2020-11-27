const session = require("express-session"),
  memoryStore = new session.MemoryStore();

var configSession = {
  name: "CookieSession",
  store: memoryStore,
  resave: false,
  saveUninitialized: false,
  /* cookie: { secure: true }, */
  secret: process.env.SECRET2,
};

function sessionConfig() {
  return configSession;
}

function sessionStore() {
  return memoryStore;
}

module.exports.sessionConfig = sessionConfig;
module.exports.sessionStore = sessionStore;
