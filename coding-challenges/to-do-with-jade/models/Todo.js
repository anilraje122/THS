const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Todo", todoSchema, "todos");
