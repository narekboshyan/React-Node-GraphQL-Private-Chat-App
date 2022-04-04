import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($newUser: UserInput!) {
    signupUser(newUser: $newUser) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SignInUser($signIn: UserSignInInput!) {
    signInUser(signIn: $signIn) {
      token
    }
  }
`;

const message = `
    $receiverId: Int!,
    $text: String!
`;

export const SEND_MSG = gql`
  mutation CreateMessage(${message}) {
    createMessage(receiverId: $receiverId,text:$text) {
      text
      id
      receiverId
      senderId
      createdAt
    }
  }
`;
