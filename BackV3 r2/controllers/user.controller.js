const axios = require("axios");
const jwt = require("jsonwebtoken");
const { chronos } = require("../properties/properties");
const config = require("../properties/properties").chronos.valor;

exports.login = (user, pass) => {
  return new Promise((resolve, reject) => {
    getCCMSAuth(user, pass)
      .then(() => {
        const token = jwt.sign({ sub: user }, config.secret, {
         // expiresIn: "180m",
          algorithm: "HS256",
        });
        resolve(token);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.getCCMSAuth = (username, password) => {
  return new Promise((resolve, reject) => {
    let keyByte = new Buffer.from(username + ":" + password).toString("ascii");
    let tokenStr = Buffer.from(keyByte, "binary").toString("base64");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Basic " + tokenStr,
      },
    };
    axios
      .get(
        "https://www.wblt.ccms.teleperformance.com/authentication",
        axiosConfig
      )
      .then((respuesta) => {
        resolve(respuesta);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.securitySing = (user, idccms) => {
  return new Promise((resolve, reject) => {
    let token = jwt.sign({ username: user, idccms: idccms }, config.secret, {
    //  expiresIn: "180m",
      algorithm: "HS256",
    });
    resolve(token);
  });
};

exports.securityVerify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        reject("invalid token");
      } else {
        resolve(decoded);
      }
    });
  });
};

exports.securityDecode = (token) => {
  jwt.decode(token, { complete: true }, (err, decoded) => {
    return decoded;
  });
};

exports.verifySync = (token, cb) => {
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      cb(err);
    } else {
      cb(decoded);
    }
  });
};

exports.verifysyncReturn = (token) => {
  let data;
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      data = err;
    } else {
      data = decoded;
    }
  });
  return data;
};
