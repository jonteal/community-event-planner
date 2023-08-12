const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  date: {
    type: String,
  },
  startingTime: {
    type: String,
  },
  endingTime: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "Happening Now", "Over"],
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
});

module.exports = mongoose.model("Event", EventSchema);
