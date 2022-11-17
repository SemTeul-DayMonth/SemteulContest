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
      text: String,
      parent: [
        {
          parentId: {
            type: Schema.Types.ObjectId,
            ref: "pages",
          },
          parentDate: String,
          parentTitle: String,
        },
      ],
      childs: [
        {
          childId: {
            type: Schema.Types.ObjectId,
            ref: "pages",
          },
          childDate: String,
          childTitle: String,
        },
      ],
      pageType: String,
      createdAt: String,
    },
  ],
});

module.exports = model("Pages", pageSchema);
