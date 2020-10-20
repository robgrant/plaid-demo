import { gql } from "apollo-server";

export const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
    type: String!
    subtype: String!
    balances: Balances!
  }

  type Balances {
    current: Float!
    isoCurrencyCode: String
  }

  type Transaction {
    id: ID!
    name: String!
    date: String!
    isoCurrencyCode: String
    amount: Float!
  }

  type Query {
    accounts(accessToken: String!): [Account!]!
    transactions(accessToken: String!, accountID: ID!): [Transaction!]!
    linkToken: String!
    accessToken(publicToken: String!): String!
  }
`;
