const userC = require("./user.controller");
const TYPES = require("tedious").TYPES;
const moment = require("moment");

let parametrizacion = (data) => {
  //console.log('revisando parametrizacion')
  //console.log(data)
  try {
    let obj = {
      table: [],
    };
    data.forEach((dato) => {
      let nombre = dato.item;
      let valor = dato.datos.valor;
      let tipo = dato.datos.tipo;
      let schema = dato.datos.schema || null;
      //console.log(nombre, valor, tipo, schema)
      if (tipo == "varchar") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.VarChar });
      } else if (tipo == "int") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Int });
      } else if (tipo == "bit") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Bit });
      } else if (tipo == "date") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Date });
      } else if (tipo == "time") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Time });
      } else if (tipo == "char") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Char });
      } else if (tipo == "bigint") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.BigInt });
      } else if (tipo == "table") {
        obj.table.push({
          nombre: nombre,
          valor: schemaRows(schema, valor),
          tipo: TYPES.TVP,
        });
      }
    });
    //console.log(obj.table)
    return obj.table;
  } catch (error) {
    console.log(error);
    return error;
  }
};

let schemaRows = (schema, valor) => {
  let c = [];
  let kesimo = Object.entries(valor);
  kesimo.forEach((valor) => {
    if (schema == "int") {
      c.push([valor[1]]);
    } else if (schema == "date") {
      var yourDate = new Date(valor[1]);
      c.push([yourDate]);
    } else if (schema == "ScheduleAux") {
      let t = valor[1];
      //c.push([t[0], t[1], t[2], new Date(t[3]).toLocaleString('en-US',{timezone: 'America/New_York'}), new Date(t[4]).toLocaleString('en-US',{timezone: 'America/New_York'})])
      c.push([t[0], t[1], t[2], t[3], t[4]]);
    } else if (schema == "parameters") {
      let t = valor[1];
      c.push([t[0], t[1], t[2]]);
    } else if (schema == "bulkData") {
      let t = valor[1];
      c.push([t[0], t[1], t[2]]);
    }
  });
  //console.log(c)
  let table;
  if (schema == "int") {
    table = {
      columns: [{ name: "id", type: TYPES.Int }],
      rows: c,
    };
  } else if (schema == "date") {
    table = {
      columns: [{ name: "item", type: TYPES.Date }],
      rows: c,
    };
  } else if (schema == "ScheduleAux") {
    table = {
      columns: [
        { name: "schedule", type: TYPES.Int },
        { name: "scheduleId", type: TYPES.Int },
        { name: "typeAux", type: TYPES.Int },
        { name: "startAux", type: TYPES.VarChar },
        { name: "endAux", type: TYPES.VarChar },
      ],
      rows: c,
    };
  } else if (schema == "parameters") {
    table = {
      columns: [
        { name: "idccms", type: TYPES.Int },
        { name: "codExtern", type: TYPES.Int },
        { name: "active", type: TYPES.Bit },
      ],
      rows: c,
    };
  }
  //console.log(table)
  return table;
};

exports.parametros = (req, tipo) => {
  console.log(req);
  let idccms = 0;
  try {
    idccms = req.user.idccms;
  } catch (error) {}
  switch (tipo) {
    case "spGetHierarchies":
      return parametrizacion([
        { item: "ccmsuser", datos: { valor: req.user, tipo: "varchar" } },
      ]);
    case "spFollowAgents":
      let params;
      params = parametrizacion([
        { item: "Login", datos: { valor: req.Login || null, tipo: "int" } },
        { item: "Name", datos: { valor: req.Name || null, tipo: "varchar" } },
        {
          item: "requestById",
          datos: { valor: req.idccms, tipo: "int" },
        },
        {
          item: "requestByUser",
          datos: { valor: req.requestByUser || null, tipo: "varchar" },
        },
        {
          item: "central",
          datos: { valor: req.central || null, tipo: "varchar" },
        },
        { item: "Lob", datos: { valor: req.Lob || null, tipo: "varchar" } },
        {
          item: "badge",
          datos: { valor: req.badge || null, tipo: "varchar" },
        },
        {
          item: "observation",
          datos: { valor: req.observation || null, tipo: "varchar" },
        },
        {
          item: "observationEnd",
          datos: { valor: req.observationEnd || null, tipo: "varchar" },
        },
        {
          item: "followId",
          datos: { valor: req.followId || null, tipo: "int" },
        },
        { item: "case", datos: { valor: req.case, tipo: "bit" } },
      ]);

      return params;
    case "spSetMainCentral":
      return parametrizacion([
        { item: "idccms", datos: { valor: req.idccms, tipo: "int" } },
        { item: "central", datos: { valor: req.central, tipo: "varchar" } },
      ]);
    case "spDashboardPerUser":
      return parametrizacion([
        { item: "idccms", datos: { valor: req.idccms, tipo: "int" } },
      ]);
    case "spDashboards":
      return parametrizacion([
        { item: "case", datos: { valor: req.case, tipo: "int" } },
        { item: "idDash", datos: { valor: req.idDash || null, tipo: "int" } },
        { item: "name", datos: { valor: req.name || null, tipo: "varchar" } },
        {
          item: "central",
          datos: { valor: req.central || null, tipo: "varchar" },
        },
        { item: "user", datos: { valor: req.user, tipo: "varchar" } },
        {
          item: "template",
          datos: { valor: req.template || null, tipo: "varchar" },
        },
      ]);
    case "spUserInfo":
      return parametrizacion([
        { item: "idccms", datos: { valor: req.idccms, tipo: "int" } },
      ]);
    case "spGetDashboardTemplate":
      return parametrizacion([
        { item: "idDash", datos: { valor: req.idDash, tipo: "int" } },
      ]);
    case "spAddUser":
      return parametrizacion([
        { item: "idccms", datos: { valor: req.idccms, tipo: "int" } },
        {
          item: "Permissions",
          datos: { valor: req.permissions, tipo: "varchar" },
        },
        {
          item: "enableCentrals",
          datos: { valor: req.enableCentrals, tipo: "varchar" },
        },
      ]);
    case "spGetEmployeePicture":
      return parametrizacion([
        { item: "login", datos: { valor: req.login, tipo: "int" } },
      ]);
      case "spAgentSupervisor":
        return parametrizacion([
          { item: "Central", datos: { valor: req.Central, tipo: "varchar" } },
        ]);
    default:
      return null;
  }
};

let letIdccms = (req) => {
  let aut = req.headers.authorization;
  if (aut) {
    let token = aut.substring(7, aut.length);
    let data = userC.verifysyncReturn(token);
    try {
      return data.idccms;
    } catch (error) {
      return error;
    }
  }
};
