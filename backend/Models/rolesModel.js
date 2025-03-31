const mongoose = require('mongoose');
const schema = mongoose.Schema;

var roleSchema = new schema({
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

var ModuleModel = mongoose.model("role", roleSchema);
module.exports = ModuleModel;
