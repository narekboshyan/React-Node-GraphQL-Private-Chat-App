import pc from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthenticationError, ForbiddenError } from "apollo-server";
import jwt from "jsonwebtoken";

const prisma = new pc.PrismaClient();
export const resolvers = {
  Query: {
    users: async (_parent, args, context) => {
      console.log(context.userId);
      if (!context.userId) {
        throw new ForbiddenError("Please Sign in First");
      }
      const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          id: {
            not: context.userId,
          },
        },
      });
      return users;
    },
    messagesByUser: async (_parent, args, context) => {
      const { receiverId } = args;
      const { userId } = context;

      if (!userId) {
        throw new ForbiddenError("Please sign in first");
      }
      const userChat = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId },
            { senderId: receiverId, receiverId: userId },
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      return userChat;
    },
  },

  Mutation: {
    signupUser: async (_parent, args, context) => {
      const userExists = await prisma.user.findUnique({
        where: {
          email: args.newUser.email,
        },
      });

      if (userExists) {
        throw new AuthenticationError("User already exists with that email");
      }
      const hashedPassword = await bcrypt.hash(args.newUser.password, 10);

      const newUser = await prisma.user.create({
        data: {
          ...args.newUser,
          password: hashedPassword,
        },
      });

      return newUser;
    },
    signInUser: async (_parent, args, context) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.signIn.email,
        },
      });
      if (!user) {
        throw new AuthenticationError("Invalid email or password");
      }
      const doMatch = await bcrypt.compare(args.signIn.password, user.password);

      if (!doMatch) {
        throw new AuthenticationError("Invalid email or password");
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      return { token };
    },
    createMessage: async (_parent, args, context) => {
      const { userId } = context;
      const { receiverId, text } = args.message;
      if (!userId) {
        throw new ForbiddenError("Please Sign in First");
      }
      const message = await prisma.message.create({
        data: {
          text,
          receiverId,
          senderId: userId,
        },
      });

      return message;
    },
  },
};
