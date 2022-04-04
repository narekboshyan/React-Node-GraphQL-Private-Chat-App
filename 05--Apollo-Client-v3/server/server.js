import { ApolloServer, gql } from "apollo-server";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
import 'dotenv/config'
import jwt from "jsonwebtoken";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Context acts like an middleware
  context: ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      return { userId };
    }
  },
});

server
  .listen()
  .then(({ url }) => console.log(`Server is running at PORT ${url}`));
