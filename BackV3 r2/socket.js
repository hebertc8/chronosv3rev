const {
  resolve
} = require("path");
const {
  rejects
} = require("assert");
const {
  ConnectionBase
} = require("mongoose");

const jwt = require("jsonwebtoken"),
  cookieParser = require("cookie-parser"),
  cookie = require("cookie"),
  store = require("./middlewares/session"),
  config = require("./properties/properties").chronos.valor,
  sessionStore = store.sessionStore(),
  sql = require("./sockets/dataSql"),
  mongo = require("./sockets/dataMongo"),
  db = require("./mongo/models");

let emmitActive = false;
let centralRooms = [];
let activeRooms = [];
let filterFollowAgents = [];
let filterLobSkill = [];
let filterAgents = [];
let filterKPIS = [];
let filterMaps = [];



module.exports = function (server) {
  var io = require("socket.io")(server);

  sql.startquerys();
  mongo.getCentrals();

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, config.secret);
      userId = payload.idccms;
      next();
    } catch (err) {
      console.log(err.message);
    }
  });
  /* io.set("authorization", function (handshake, callback) {
    const cookies = handshake.headers.cookie;
    if (!cookies) {
      console.log("no tienes cookie");
      return callback(null, false);
    } else {
      const parsedCookie = cookie.parse(cookies);
      sessionStore.get(
        cookieParser.signedCookie(
          parsedCookie["CookieSession"],
          process.env.SECRET2
        ),
        function (err, sessions) {
          if (err) {
            console.log("no cookie");
            callback(null, false);
          } else {
            console.log(sessions);
            if (sessions && sessions.token) {
              if (userId == sessions.token) {
                console.log("valido");
                callback(null, true);
              }
            } else {
              console.log("cookie sin cifrado correcto");
              callback(null, false);
            }
          }
        }
      );
    }
  }); */

  io.of("/agentsRooms").on("connection", (socket) => {
    socket.emit("reload", "Hello and welcome to central rooms");
    socket.on("joinRoom", (room) => {
      centralRooms = mongo.centralRooms();
      activeRooms = mongo.activeRooms();
      if (centralRooms.includes(room)) {
        socket.join(room);
        for (r = 0; r < centralRooms.length; r++) {
          if (centralRooms[r] == room) {
            if (!activeRooms.includes(room)) {
              mongo.addActiveRoom(centralRooms[r]);
            }
            return socket.emit(
              "success",
              `Estas conectado a la central ${centralRooms[r]}`
            );
          }
        }
      } else {
        return socket.emit("err", `No Room named ${room}`);
      }

      socket.join(room);
    });

    //room

    function updateEmitCentrals() {
      console.log("se inicia los emmits");
      for (r = 0; r < centralRooms.length; r++) {
        if (activeRooms.includes(centralRooms[r])) {
          console.log(centralRooms[r], r, 'Others');
          // socket
          //   .to(centralRooms[r])
          //   .emit(
          //     `agents${centralRooms[r]}`,
          //     sql.filterAgents(centralRooms[r])
          //   );
          socket
            .to(centralRooms[r])
            .emit(`kpis${centralRooms[r]}`, sql.filterKPIS(centralRooms[r]));
          socket
            .to(centralRooms[r])
            .emit(
              `${centralRooms[r]}FollowAgents`,
              sql.filterFollowAgents(centralRooms[r])
            );
            socket
            .to(centralRooms[r])
            .emit(
              `RTM${centralRooms[r]}`,
              sql.filterRtm(centralRooms[r])
            );
            socket
            .to(centralRooms[r])
            .emit(
              `kpisConsolidated${centralRooms[r]}`,
              sql.filterKpisConsolidated(centralRooms[r])
            );
            socket
            .to(centralRooms[r])
            .emit(
              `AgentGroup${centralRooms[r]}`,
              sql.filterAgentGroup(centralRooms[r])
            );
          // socket.emit(`maps${centralRooms[r]}`,
          //   sql.filterMaps(centralRooms[r])
          // );
        }
      }
    }

    function updateEmitAgents() {
      for (r = 0; r < centralRooms.length; r++) {
        if (activeRooms.includes(centralRooms[r])) {
          console.log(centralRooms[r], r, 'Agents');
          socket
            .to(centralRooms[r])
            .emit(
              `agents${centralRooms[r]}`,
              sql.filterAgents(centralRooms[r])
            );
        }
      }
    }

    function wait20EmitCentrals() {
      activeRooms = mongo.activeRooms();
      centralRooms = mongo.centralRooms();
      updateEmitCentrals();
    }

    if (!emmitActive) {
      emmitActive = true;
      setInterval(() => {
        wait20EmitCentrals();
      }, 20000);
      setInterval(() => {
        updateEmitAgents();
      }, 10000);
    }
  });
};