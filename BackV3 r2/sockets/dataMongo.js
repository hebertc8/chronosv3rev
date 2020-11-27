const { centrals } = require("../mongo/models");

db = require("../mongo/models");
let activeRooms = [];
let centralRooms = [];

Array.prototype.unique = (function (a) {
  return function () {
    return this.filter(a);
  };
})(function (a, b, c) {
  return c.indexOf(a, b + 1) < 0;
});

function getActiveRooms() {
  let filter = { active: true };
  db.centrals
    .find(filter)
    .then((data) => {
      if (data == null) {
      } else {
        data.forEach((elem) => {
          activeRooms[activeRooms.length] = elem.central;
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function getCentrals() {
  db.centrals
    .find()
    .then((data) => {
      if (data == null) {
      } else {
        data.forEach((elem) => {
          centralRooms[centralRooms.length] = elem.central;
        });
        centralRooms = centralRooms.unique();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function addActiveRoom(room) {
  const filtre = {
    central: room,
    active: false,
  };
  db.centrals
    .updateOne(filtre, [{ $set: { active: true } }])
    .then(() => {
      activeRooms[activeRooms.length] = room;
      activeRooms.unique();
      return true;
    })
    .catch((err) => {
      console.log(err);
    });
}
function getData() {
  getActiveRooms();
  getCentrals();
}
function retunActiveRooms() {
  return activeRooms;
}
function retunCentrals() {
  return centralRooms;
}

module.exports = {
  getCentrals: getData,
  addActiveRoom,
  activeRooms: retunActiveRooms,
  centralRooms: retunCentrals,
};
