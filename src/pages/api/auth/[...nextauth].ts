import axios from "axios";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthUser, authUserSchema } from "../../../models/user";
import api from "../../../utils/axios";
export default NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          type: "text",
        },
        password: {
          type: "password",
        },
      },
      authorize: async (credentials) => {
        try {
          const response = await api.post("api/auth/login", {
            username: credentials!.username,
            password: credentials!.password,
          });

          // Make sure that the data we are receiving is a valid
          // Auth User Model
          const isUserValid = !!authUserSchema.safeParse(response.data);
          if (isUserValid) {
            return response.data;
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
