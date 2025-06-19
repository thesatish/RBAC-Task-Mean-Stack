const mongoose = require('mongoose');
const schema = mongoose.Schema;

const RolesAndPermissionSchema = new schema({
  name: Number,
  permissions: [
    {
      module:  { type: mongoose.Schema.Types.ObjectId, ref: "module" },
      actions: {
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        read: { type: Boolean, default: false },
      },
    }
  ],
  role: { type: mongoose.Schema.Types.ObjectId, ref: "role" },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("RolesAndPermission", RolesAndPermissionSchema);