import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    users: [User]
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSignInInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  type Mutation {
    signupUser(newUser: UserInput!): User
    signInUser(signIn: UserSignInInput!): Token
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }
`;