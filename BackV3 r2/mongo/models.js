const mongoose = require("./config"),
  Schema = mongoose.Schema;

const schemas = {
  activeRoomSchema: new Schema({
    id_: Schema.Types.ObjectId,
    central: String,
    active: Boolean,
  }),
};

const models = {
  centrals: mongoose.model("centrals", schemas.activeRoomSchema),
};

module.exports = models;
