const { resolve } = require("path");
const { rejects } = require("assert");
const { query } = require("../controllers/sql.controller");
const moment = require('moment'); // require


let countUpdates = 0,
  countUpdates2 = 0,
  filterFollowAgents = [],
  filterLobSkill = [],
  filterAgents = [],
  filterKPIS = [],
  filterMaps = [];
  filterRtm = [];
  filterKpisConsolidated = [];
  filterAgentGroup = [];
  agentes = false;

Array.prototype.unique = (function (a) {
  return function () {
    return this.filter(a);
  };
})(function (a, b, c) {
  return c.indexOf(a, b + 1) < 0;
});

function update60sec() {
  countUpdates2 = countUpdates2 + 60;
  let inicio = new Date();
  query("vwLobSkill")
    .then((resultado) => {
      filterLobSkill = resultado;
      let fin = new Date();
      console.log("LobSkill Consultados",  moment(fin).format('ss'), moment(inicio).format('ss') );
      // callback();
    })
    .catch((err) => {
      console.log(err);
    });

  let inicio2 = new Date();
  query("vwRTMShift")
    .then((rt) => {
      filterRtm = rt;
      let fin2 = new Date();
      console.log("RTM Descargado",  moment(fin2).format('ss'), moment(inicio2).format('ss') );
      // callback();
    })
    .catch((err) => {
      console.log(err);
    });


    let inicio3 = new Date();
    query("vwKpisConsolidated")
      .then((rt) => {
        filterKpisConsolidated = rt;
        let fin3 = new Date();
        console.log("KpisConsolidados Descargado",  moment(fin3).format('ss'), moment(inicio3).format('ss') );
        // callback();
      })
      .catch((err) => {
        console.log(err);
      });

      let inicio4 = new Date();
      query("vwAgentQuality")
        .then((ag) => {
          filterAgentGroup = ag;
          let fin4 = new Date();
          console.log("Agent Group Descargado",  moment(fin4).format('ss'), moment(inicio4).format('ss') );
          // callback();
        })
        .catch((err) => {
          console.log(err);
        });
  console.log(countUpdates2);
}


function updateState20sec(callback) {
  countUpdates = countUpdates + 20;
  let inicio = new Date();
  query("vwAgentStates")
    .then((resultado) => {
      filterAgents = resultado;
      let fin = new Date();
      console.log("Agentes Consultados",moment(inicio).format('mm:ss'), moment(fin).format('mm:ss'));
      // callback();
      setTimeout(() => {
        updateState20sec()  
      }, 7000);
      
    })
    .catch((err) => {
      console.log(err);
      updateState20sec()
    });
  console.log(countUpdates);
}

function updateFollowAgents() {
  let inicio = new Date();
  query("vwFollowAgents")
    .then((resultado) => {
      filterFollowAgents = resultado;
      let fin = new Date();
      console.log("FollowAgents Consultados",moment.utc(moment(inicio,"ss").diff(moment(fin,"ss"))).format("ss"),'s');
      setTimeout(() => {
        updateFollowAgents()
      }, 20000);
    })
    .catch((err) => {
      console.log("err follow");
      console.log(err);
      setTimeout(() => {
        updateFollowAgents()
      }, 20000);
    });
}

function updateKPI() {
  let inicio = new Date();
  query("vwkpis")
    .then((resultado) => {
      filterKPIS = resultado;
      let fin = new Date();
      console.log("Kpi Consultados", moment.utc(moment(inicio,"ss").diff(moment(fin,"ss"))).format("ss"),'s');
      setTimeout(() => {
        updateKPI()
      }, 10000);
    })
    .catch((err) => {
      console.log(err);
      setTimeout(() => {
        updateKPI()
      }, 10000);
    });
}

function updateMap() {
  let inicio = new Date();
  query("vwWorkStations")
    .then((resultado) => {
      filterMaps = resultado;
      let fin = new Date();
      console.log("Maps Consultados", moment.utc(moment(inicio,"ss").diff(moment(fin,"ss"))).format("ss"),'s');
      setTimeout(() => {
        updateMap()
      }, 30000);
    })
    .catch((err) => {
      /* console.log(err); */
      setTimeout(() => {
        updateMap()
      }, 30000);
    });
}

function wait60sec() {
  queryActive = true;
  setInterval(() => {
    update60sec();
  }, 60000);
}

function wait20sec() {
  queryActive = true;
  //setInterval(function () {
    if (!agentes) {
      updateState20sec();
      agentes = true;
    }
    updateFollowAgents();
    updateKPI();
    updateMap();
 // }, 20000);
}

function activeQuerys() {
  console.log('Iniciando descargas SQL');
  wait60sec();
  wait20sec();
}

function retunFollowAgents(Name) {
  let res = filterFollowAgents.filter(data => data.NameCentral == Name);
  return res;
}
function retunLobSkill(Name) {
  let res = filterLobSkill.filter((data) => data.NameCentral == Name);
  return res;
}
function retunAgents(Name) {
  let res = filterAgents.filter(data => data.NameCentral == Name);
  return res;
}
function retunKPIs(Name) {
  let res = filterKPIS.filter(data => data.NameCentral == Name);
  return res;
}
function retunMaps(Name) {
  let res = filterMaps.filter(data => data.NameCentral == Name);
  return res;
}

function retunRTM(Name) {
  let res = filterRtm.filter(data => data.Central == Name);
  return res;
}

function retunKpiConsolidated(Name) {
  let res = filterKpisConsolidated.filter(data => data.NameCentral == Name);
  return res;
}

function retunAgetGroup(Name) {
  let res = filterAgentGroup.filter(data => data.NameCentral == Name);
  return res;
}

module.exports = {
  startquerys: activeQuerys,
  filterFollowAgents: retunFollowAgents,
  filterLobSkill: retunLobSkill,
  filterAgents: retunAgents,
  filterKPIS: retunKPIs,
  filterMaps: retunMaps,
  filterRtm: retunRTM,
  filterKpisConsolidated: retunKpiConsolidated,
  filterAgentGroup: retunAgetGroup,
};
