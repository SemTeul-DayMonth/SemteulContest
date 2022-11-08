const { model, Schema } = require("mongoose");

const todoSchema = new Schema({
  username: String,
  todos: [
    {
      date: String,
      todo: String,
      createdAt: String,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Todos", todoSchema);
