const { AuthenticationError, UserInputError } = require("apollo-server");

const Todos = require("../../models/Todos");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getTodos(_, { userId }) {
      try {
        const userTodos = await Todos.findOne({ userId });

        if (userTodos) {
          return userTodos;
        } else {
          throw new Error("Todo not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getTodo(_, { userId, todoId }) {
      try {
        const userTodos = await Todos.findOne({ userId });
        if (userTodos) {
          const todo = await userTodos.todos.findIndex((t) => t.id === todoId);
          if (todo) {
            return todo;
          } else {
            throw new Error("Todo not found");
          }
        } else {
          throw new Error("userTodo not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createTodo(_, { userId, date, todo }, context) {
      const { username } = checkAuth(context);

      if (date.trim() === "" && todo.trim() === "") {
        throw new UserInputError("Empty Content", {
          errors: {
            body: "Content must not empty",
          },
        });
      }

      const userTodos = await Todos.findOne({ userId });

      if (userTodos.username === username) {
        if (userTodos.todos) {
          userTodos.todos.unshift({
            date: new Date(date).toISOString(),
            todo,
            createdAt: new Date().toISOString(),
          });

          const resTodos = await userTodos.save();
          return resTodos;
        } else throw new UserInputError("Todo not found");
      } else throw new AuthenticationError("Action not allowed");
    },

    async deleteTodo(_, { userId, todoId }, context) {
      const { username } = checkAuth(context);

      const userTodos = await Todos.findOne({ userId });

      if (userTodos) {
        const todoIndex = userTodos.todos.findIndex((t) => t.id === todoId);

        if (userTodos.username === username) {
          userTodos.todos.splice(todoIndex, 1);
          const resTodos = await userTodos.save();
          return resTodos;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Todo not found");
      }
    },

    async updateTodo(_, { userId, todoId, date, todo }, context) {
      const { username } = checkAuth(context);

      const userTodos = await Todos.findOne({ userId });

      if (userTodos) {
        if (userTodos.username === username) {
          const todoIndex = await userTodos.todos.findIndex(
            (t) => t.id === todoId
          );

          userTodos.todos[todoIndex].date = date;
          userTodos.todos[todoIndex].todo = todo;
          const resTodos = await userTodos.save();
          return resTodos;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Todo not found");
      }
    },
  },
};
