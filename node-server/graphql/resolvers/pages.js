const { AuthenticationError, UserInputError } = require("apollo-server");

const Pages = require("../../models/Pages");
const checkAuth = require("../../utils/check-auth");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  Query: {
    async getPages(_, { userId }) {
      try {
        const userPages = await Pages.findOne({ userId });

        if (userPages) {
          return userPages;
        } else {
          throw new Error("Page not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPage(_, { userId, pageId }) {
      try {
        const userPages = await Pages.findOne({ userId });
        if (userPages) {
          const page = await userPages.pages.findIndex((t) => t.id === pageId);
          if (page) {
            return page;
          } else {
            throw new Error("Page not found");
          }
        } else {
          throw new Error("userPages not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPage(
      _,
      { pageInput: { userId, title, date, text, parentIds, childIds } },
      context
    ) {
      const { username } = checkAuth(context);
      if (date.trim() === "" && title.trim() === "") {
        throw new UserInputError("Empty Content", {
          errors: {
            body: "Content must not empty",
          },
        });
      }
      const userPages = await Pages.findOne({ userId });
      console.log(title, userId, date, text);
      if (userPages.username === username) {
        if (userPages.pages) {
          userPages.pages.unshift({
            title,
            date: new Date(date).toISOString(),
            isDone: false,
            parent: parentIds,
            child: childIds,
            text: text ? text : "",
            createdAt: new Date().toISOString(),
          });
          const resPages = await userPages.save();
          return resPages;
        } else throw new UserInputError("page not found");
      } else throw new AuthenticationError("Action not allowed");
    },

    async deletePage(_, { userId, pageId }, context) {
      const { username } = checkAuth(context);

      const userPages = await Pages.findOne({ userId });

      if (userPages) {
        const pageIndex = userPages.pages.findIndex((t) => t.id === pageId);

        if (userPages.username === username) {
          userPages.pages.splice(pageIndex, 1);
          const resPages = await userPages.save();
          return resPages;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("page not found");
      }
    },

    async updatePage(
      _,
      { pageInput: { userId, pageId, title, date, text, parentIds, childIds } },
      context
    ) {
      // parentIds is full list which we want to change into
      const { username } = checkAuth(context);

      const userPages = await Pages.findOne({ userId });

      if (userPages) {
        if (userPages.username === username) {
          const pageIndex = await userPages.pages.findIndex(
            (t) => t.id === pageId
          );
          page = userPages.pages[pageIndex];
          page.date = date;
          page.title = title;
          page.text = text;
          if (parentIds) page.parent = parentIds;
          if (childIds) page.child = childIds;

          userPages.pages[pageIndex] = page;
          const resPages = await userPages.save();
          return resPages.pages[pageIndex];
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("page not found");
      }
    },
  },
};
