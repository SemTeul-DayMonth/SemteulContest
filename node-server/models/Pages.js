const { model, Schema } = require("mongoose");

const pageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  username: String,
  pages: [
    {
      title: String,
      date: String,
      isDone: Boolean,
      parent: [
        {
          parentId: {
            type: Schema.Types.ObjectId,
            ref: "pages",
          },
        },
      ],
      child: [
        {
          childId: {
            type: Schema.Types.ObjectId,
            ref: "pages",
          },
        },
      ],
      text: String,
      createdAt: String,
    },
  ],
});

module.exports = model("Pages", pageSchema);
