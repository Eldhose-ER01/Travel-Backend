const mongoose = require("mongoose");
const StatesSchema = new mongoose.Schema({
    statename: { type: String },
    districtname: { type: String },
    districtdesc: { type: String },
    image: { type: String },
    status: { type: Boolean, default: true }
});
module.exports = mongoose.model("State", StatesSchema);