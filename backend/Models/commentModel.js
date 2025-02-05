const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    text: String,
    task: { type: mongoose.Schema.Types.ObjectId, ref: "task" },
    commentedBy : { type: mongoose.Schema.Types.ObjectId, ref: "user"}
  }, { timestamps: true });
  
const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;