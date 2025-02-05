const mongoose = require('mongoose');
const schema = mongoose.Schema;

var taskSchema = new schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      required: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  }, { 
    timestamps: true,
    toJSON: { virtuals: true }, // Allowing virtual fields in JSON response
    toObject: { virtuals: true } 
  });
  
  // Create a virtual field for comments
  taskSchema.virtual("comments", {
    ref: "comment", // Reference to Comment model
    localField: "_id", // Match task _id with comment.task
    foreignField: "task" // Look for comments where task == task._id
  });
  
  var TaskModel = mongoose.model("task", taskSchema);
  module.exports = TaskModel;
  