require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {chronos, MyTp} = require("./properties/properties");
const port = chronos.PORT;
const app = express();
const server = require("http").Server(app);
const socket = require("./socket");
const router = express.Router();
const routes = require("./routes/router");
const { errorHandler, logger } = require("./controllers/err.handler");
const { jwt } = require("./controllers/jwt.controller");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const store = require('./middlewares/session');
const corsOptions = { origin: "*" };
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(cookieParser());
app.use(session(store.sessionConfig()));
app.use(logger);
app.use(express.static(path.join(__dirname, "./dist")));
/* app.use(jwt()); */
app.use("/api", router);
routes(router);
socket(server);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.use(errorHandler);

server.listen(port, function () {
  console.log(
    "Listening on port " +
      port +
      "!" +
      " - start: " +
      Date(Date.now()).toString()
  );
});
