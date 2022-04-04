import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    users: [User]
    messagesByUser(receiverId: Int!): [Message]
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
  input userMessageInput {
    receiverId: Int!
    text: String!
  }

  scalar Date

  type Message {
    id: ID!
    text: String!
    receiverId: Int!
    senderId: Int!
    createdAt: Date!
  }

  type Token {
    token: String!
  }

  type Mutation {
    signupUser(newUser: UserInput!): User
    signInUser(signIn: UserSignInInput!): Token
    createMessage(receiverId: Int!, text: String!): Message
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Subscription {
    messageAdded: Message
  }
`;
