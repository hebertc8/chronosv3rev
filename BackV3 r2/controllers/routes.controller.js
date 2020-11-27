const {
  procedure,
  query
} = require("./sql.controller");
const userC = require("./user.controller");
const parametros = require("./params.controller").parametros;
const {
  tables
} = require("./download.controller");
const config = require("../properties/properties").chronos.valor;
const jwt = require("jsonwebtoken");
const {
  filterLobSkill
} = require("../sockets/dataSql");
const fs = require('fs');
const {
  exportExcel
} = require("./excelModule");


exports.login = (req, res) => {
  let sp = "spGetHierarchies";
  let datos = unbuffer(req.body.body);
  user = datos.user;
  pass = datos.pass;
  let p = parametros({
    user
  }, sp);
  if (user != "" && pass != "") {
    userC
      .getCCMSAuth(user, pass)
      .then(() => {
        procedure(sp, p)
          .then((data) => {
            if (Object.entries(data).length === 0) {
              res.status(404).json("user does not exist");
            } else {
              let idccms = data[0].idccms;
              userC
                .securitySing(user, idccms)
                .then((token) => {
                  req.session.token = data[0].idccms;
                  req.session.save();
                  responsep(1, req, res, {
                    token,
                    data
                  });
                })
                .catch((err) => {
                  console.log(err);
                  responsep(2, req, res, err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json(err);
          });
      })
      .catch((error) => {
        res.status(401).json("credentials error");
      });
  } else {
    res.status(401).json("without credentials");
  }
};

exports.CallSp = (spName, req, res) => {
  const payload = jwt.verify(
    req.headers.authorization.split(" ")[1],
    config.secret
  );
  req.body.idccms = payload.idccms;
  procedure(spName, parametros(req.body, spName))
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      responsep(2, req, res, err);
    });
};

exports.lobSkill = (req, res) => {
  let centrala = req.body.central;
  try {
    const payload = jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.secret
    );
    let result = filterLobSkill(centrala);
    responsep(1, req, res, result);
  } catch (err) {
    responsep(2, req, res, err);
    console.log(error);
  }
};

exports.JOApplicants = (req, res) => {

  query("vJobOfferApplicants", true)
    .then((resultado) => {
      exportExcel(resultado, 'JobOfferApplicants', res);
    })
    .catch((err) => {
      responsep(2, req, res, err);
    });

};

exports.testSQL = (req, res) => {
  let b = [
    [{
      nombre: "tabla1"
    }, {
      valor: {}
    }],
    [{
      nombre: "tabla2"
    }, {
      valor: {}
    }],
  ];
  query("vwAgentStates")
    .then((resultado) => {
      responsep(1, req, res, resultado);
    })
    .catch((err) => {
      responsep(2, req, res, err);
    });
};

exports.testConsult = (req, res) => {
  let b = [
    [{
      nombre: "tabla1"
    }, {
      valor: {}
    }],
    [{
      nombre: "tabla2"
    }, {
      valor: {}
    }],
  ];
  query("vwEstaciones")
    .then((resultado) => {
      responsep(1, req, res, resultado);
    })
    .catch((err) => {
      responsep(2, req, res, err);
    });
};

function unbuffer(text) {
  let first = text.slice(2, 3);
  let last = text.slice(4);
  let concant = first + last;
  let buff = new Buffer(concant, "base64");
  let data = buff.toString("ascii");
  let res = JSON.parse(data);
  return res;
}

let responsep = (tipo, req, res, resultado) => {
  return new Promise((resolve, reject) => {
    let date = new Date();
    let ress = res;
    let reqq = req;
    let ip = reqq.connection.remoteAddress;
    console.log(date, ip, reqq.originalUrl, JSON.stringify(resultado).length);
    if (tipo == 1) {
      /* req.session.token = 'resultado.data[0].idccms'; */
      res.status(200).json(resultado);
      resolve(200);
    } else if (tipo == 2) {
      console.log("Error at:", date, "res: ", resultado);
      res.status(400).json(resultado);
      resolve(400);
    }
  });
};

exports.test = (req, res) => {
  let num = Math.floor(Math.random() * (100 - 1)) + 1;
  res.status(200).json({
    random: num
  });
};