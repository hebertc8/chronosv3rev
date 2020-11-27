const {chronos, MyTp} = require("../properties/properties");
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const TYPES = require("tedious").TYPES;

exports.query = (table, Mytp) => {
  return new Promise((resolve, reject) => {
    var conn = new Connection(Mytp ? MyTp.config: chronos.config);
    conn.on("connect", (err) => {
      if (err) {
        reject("error while connecting server");
      } else {
        request = new Request(
          "select * from " + table + " with(nolock)",
          (err, rowCount, rows) => {
            if (err) {
              reject("error in query execution");
            } else {
              conn.close();
              injectjson(rows).then((valor) => {
                try {
                  resolve(valor);
                } catch (error) {
                  reject("error in query result");
                }
              });
            }
          }
        );

        request.on("requestCompleted", () => {
          conn.close();
        });
        request.on("error", (err) => {
          reject(err);
        });

        try {
          conn.execSql(request);
        } catch (error) {
          console.log(error);
        }
      }
    });
    conn.on("error", (err) => {
      console.log(err);
      reject("error connecting server");
      conn.close();
    });
  });
};

exports.procedure = (storedProcedure, parametros) => {
  return new Promise((resolve, reject) => {
    let resultadoOperacion = [];
    var conn = new Connection(chronos.config);
    conn.on("connect", (err) => {
      if (err) {
        console.log(err);
        reject("error while connecting server");
      } else {
        request = new Request(storedProcedure, (err, rowCount, rows) => {
          if (err) {
            console.log(
              "error proc:",
              err.procName,
              " - message: ",
              err.message,
              " - procline",
              err.lineNumber
            );
            reject("error in query execution");
          } else {
            conn.close();

            /* console.log(JSON.stringify(rows)) */
            injectjson(rows).then((valor) => {
              try {
                resolve(JSON.parse(valor[0].Result));
              } catch (error) {
                resolve(valor);
                reject("error in query result");
              }
            });
          }
        });

        parametros.forEach((valor) => {
          request.addParameter(valor.nombre, valor.tipo, valor.valor);
        });

        /* request.addOutputParameter('errorCode', TYPES.Int)
                request.addOutputParameter('errorMessage', TYPES.VarChar)
                request.addOutputParameter('secuencia', TYPES.Int) */

        /* request.on('returnValue', (parameterName, value, metadata) => {
                    console.log('entro a retorno')
                    let object = {}
                    object[parameterName] = value
                    resultadoOperacion.push(object)

                }); */
        request.on("requestCompleted", () => {
          conn.close();
        });
        request.on("error", (err) => {
          reject(err);
        });
        try {
          conn.callProcedure(request);
        } catch (error) {
          console.log(error);
        }
      }
    });
    conn.on("error", (err) => {
      console.log(err);
      reject(err);
      reject("error connecting server");
      conn.close();
    });
  });
};

let injectjson = (rows) => {
  return new Promise((resolve, reject) => {
    jsonArray = [];
    rows.forEach((columns) => {
      let rowObject = {};
      columns.forEach((column) => {
        rowObject[column.metadata.colName] = column.value;
      });
      jsonArray.push(rowObject);
    });
    resolve(jsonArray);
  });
};
