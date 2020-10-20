import { ApolloServer } from "apollo-server";
import plaid from "plaid";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    plaidClient: new plaid.Client({
      clientID: process.env.PLAID_CLIENT_ID!,
      secret: process.env.PLAID_SECRET!,
      env: plaid.environments.sandbox,
      options: { version: "2020-09-14" },
    }),
  },
});
