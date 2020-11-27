const user = require("../controllers/user.controller"),
  routes = require("../controllers/routes.controller");

module.exports = (router) => {
  router.post("/login", routes.login);
  SpRouter("/template", "spGetDashboardTemplate");
  SpRouter("/followAgents", "spFollowAgents");
  SpRouter("/updateAgents", "spFollowAgents");
  SpRouter("/centralesDashboards", "spDashboardPerUser");
  SpRouter("/addDashboards", "spDashboards");
  SpRouter("/getPicture", "spGetEmployeePicture");
  SpRouter("/userInfo", "spUserInfo");
  SpRouter("/addUsers", "spAddUser");
  SpRouter("/mainCentral", "spSetMainCentral");
  SpRouter("/listSupervisor", "spAgentSupervisor");
  router.post("/lobSkill", routes.lobSkill);
  router.get("/jobOfferApplicants", routes.JOApplicants);

  function SpRouter(route, spName) {
    router.post(route, (req, res) => routes.CallSp(spName, req, res));
  }
  router.get("/testSql", routes.testSQL);
  router.get("/testConsult", routes.testConsult);
};
