import { ApolloServer, gql } from "apollo-server";
import { users, Todos } from "./data.js";
import { randomUUID } from "crypto";

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(newUser: UserInput!): User
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    todos: [Todo]
  }

  type Todo {
    title: String!
    by: ID!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_parent, { id }, context) => {
      console.log(context);
      if (!context.userLoggedIn) {
        throw new Error("Error in authentication");
      }
      return users.find(user => user.id === id);
    },
  },
  User: {
    todos: _parent => {
      return Todos.filter(todo => todo.by === _parent.id);
    },
  },
  Mutation: {
    createUser: (_parent, args) => {
      const newUser = {
        id: randomUUID,
        ...args.newUser,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    userLoggedIn: true,
  }),
});

server
  .listen()
  .then(({ url }) => console.log(`Server is running at PORT ${url}`));
