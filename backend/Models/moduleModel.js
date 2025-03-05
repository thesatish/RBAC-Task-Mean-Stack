const mongoose = require('mongoose');
const schema = mongoose.Schema;

var moduleSchema = new schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "",
  },
  code: {
    type: String
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

var ModuleModel = mongoose.model("task", moduleSchema);
module.exports = ModuleModel;
