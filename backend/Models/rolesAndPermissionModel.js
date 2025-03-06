const mongoose = require('mongoose');
const schema = mongoose.Schema;

const RolesAndPermissionSchema = new schema({
  name: String,
  permissions: [
    {
      module: String,
      actions: {
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        read: { type: Boolean, default: false },
      },
    }
  ],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("RolesAndPermission", RolesAndPermissionSchema);