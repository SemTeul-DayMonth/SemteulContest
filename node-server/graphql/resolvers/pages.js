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
      {
        pageInput: {
          userId,
          title,
          date,
          text = "",
          pageType = "page",
          parentInput = [],
          childInput = [],
        },
      },
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

      if (userPages.username === username) {
        if (userPages.pages) {
          userPages.pages.unshift({
            title,
            date: new Date(date).toISOString(),
            isDone: false,
            parent: parentInput,
            childs: childInput,
            text: text,
            pageType,
            createdAt: new Date().toISOString(),
          });
          let resPages = await userPages.save();

          if (parentInput.length !== 0) {
            const userPages2 = await Pages.findOne({ userId });

            parentInput.map((page) => {
              const prntIdx = userPages2.pages.findIndex(
                (p) => p.id === page.parentId
              );
              userPages2.pages[prntIdx].childs.unshift({
                childId: userPages2.pages[0].id,
                childTitle: userPages2.pages[0].title,
                childDate: userPages2.pages[0].date,
              });
            });

            resPages = await userPages2.save();
          }
          if (childInput.length !== 0) {
            const userPages2 = await Pages.findOne({ userId });

            childInput.map((page) => {
              const childIdx = userPages2.pages.findIndex(
                (p) => p.id === page.childId
              );
              userPages2.pages[childIdx].parent.unshift({
                parentId: userPages2.pages[0].id,
                parentTitle: userPages2.pages[0].title,
                parentDate: userPages2.pages[0].date,
              });
            });

            resPages = await userPages2.save();
          }
          return resPages;
        } else throw new UserInputError("page not found");
      } else throw new AuthenticationError("Action not allowed");
    },

    async deletePage(_, { userId, pageId }, context) {
      const { username } = checkAuth(context);

      const userPages = await Pages.findOne({ userId });

      if (userPages) {
        const pageIndex = userPages.pages.findIndex((t) => t.id === pageId);
        page = userPages.pages[pageIndex];
        dltPrnt = page.parent;
        dltChild = page.childs;

        if (userPages.username === username) {
          userPages.pages.splice(pageIndex, 1);
          if (dltPrnt.length !== 0) {
            dltPrnt.map(({ parentId }) => {
              const prntIdx = userPages.pages.findIndex(
                (p) => p.id === String(parentId)
              );
              let userChilds = userPages.pages[prntIdx].childs;
              userChilds = userChilds.filter(({ childId }) => {
                String(childId) !== page.id;
              });
              userPages.pages[prntIdx].childs = userChilds;
            });
          }
          if (dltChild.length !== 0) {
            dltChild.map(({ childId }) => {
              const childIdx = userPages.pages.findIndex(
                (p) => p.id === String(childId)
              );
              let userParent = userPages.pages[childIdx].parent;
              userParent = userParent.filter(
                ({ parentId }) => String(parentId) !== page.id
              );
              userPages.pages[childIdx].parent = userParent;
            });
          }
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
      {
        pageInput: {
          userId,
          pageId,
          title,
          date,
          text,
          pageType,
          parentInput = [],
          childInput = [],
        },
      },
      context
    ) {
      // parentInput is full list which we want to change into
      const { username } = checkAuth(context);

      const userPages = await Pages.findOne({ userId });

      if (userPages) {
        if (userPages.username === username) {
          const pageIndex = await userPages.pages.findIndex(
            (t) => t.id === pageId
          );

          page = userPages.pages[pageIndex];
          const addPrnt = parentInput.filter(
            (prnt) => !page.parent.includes(prnt)
          );
          const addChild = childInput.filter(
            (child) => !page.childs.includes(child)
          );
          const dltPrnt = page.parent.filter(
            (prnt) => !parentInput.includes(prnt)
          );
          const dltChild = page.childs.filter(
            (child) => !childInput.includes(child)
          );

          page.date = date || page.date;
          page.title = title || page.title;
          page.text = text || page.text;
          page.pageType = pageType || page.pageType;
          page.parent = parentInput;
          page.childs = childInput;

          userPages.pages[pageIndex] = page;
          const resPages = await userPages.save();

          const userPages2 = await Pages.findOne({ userId });
          if (addPrnt.length !== 0) {
            addPrnt.map(({ parentId }) => {
              const prntIdx = userPages2.pages.findIndex(
                (p) => p.id === parentId
              );
              userPages2.pages[prntIdx].childs.unshift({
                childId: page.id,
                childTitle: page.title,
                childDate: page.date,
              });
            });
          }
          if (addChild.length !== 0) {
            addChild.map(({ childId }) => {
              const childIdx = userPages2.pages.findIndex(
                (p) => p.id === childId
              );
              userPages2.pages[childIdx].parent.unshift({
                parentId: page.id,
                parentTitle: page.title,
                parentDate: page.date,
              });
            });
          }
          if (dltPrnt.length !== 0) {
            dltPrnt.map(({ parentId }) => {
              const prntIdx = userPages2.pages.findIndex(
                (p) => p.id === String(parentId)
              );
              let userChilds = userPages2.pages[prntIdx].childs;
              userChilds = userChilds.filter(({ childId }) => {
                String(childId) !== page.id;
              });
              userPages2.pages[prntIdx].childs = userChilds;
            });
          }
          if (dltChild.length !== 0) {
            dltChild.map(({ childId }) => {
              const childIdx = userPages2.pages.findIndex(
                (p) => p.id === String(childId)
              );
              let userParent = userPages2.pages[childIdx].parent;
              userParent = userParent.filter(
                ({ parentId }) => String(parentId) !== page.id
              );
              userPages2.pages[childIdx].parent = userParent;
            });
          }
          await userPages2.save();
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
