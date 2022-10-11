const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Mutation: {
    async createTdyTd(_, { postId, date, todo }, context) {
      const { username } = checkAuth(context);
      if (date.trim() === "" && todo.trim() === "") {
        throw new UserInputError("Empty Content", {
          errors: {
            body: "Content must not empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.tdyTds.unshift({
          date,
          todo,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },

    async deleteTdyTd(_, { postId, tdyTdId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const tdyTdIndex = post.tdyTds.findIndex((t) => t.id === tdyTdId);

        if (post.tdyTds[tdyTdIndex].username === username) {
          post.tdyTds.splice(tdyTdIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
