import { Resolvers } from "./generated/graphql";
import plaid from "plaid";
import { prop } from "ramda";

export const resolvers: Resolvers<{ plaidClient: plaid.Client }> = {
  Account: {
    id: prop("account_id"),
  },
  Balances: {
    isoCurrencyCode: prop("iso_currency_code"),
  },
  Query: {
    async accounts(_, { accessToken }, { plaidClient }) {
      const accountsResponse = await plaidClient.getAccounts(accessToken);
      return accountsResponse.accounts;
    },
    async transactions(_, { accessToken, accountID }, { plaidClient }) {
      const response = await plaidClient.getTransactions(
        accessToken,
        "2020-01-01",
        "2021-01-01",
        { account_ids: [accountID] }
      );
      return response.transactions;
    },
    async linkToken(_parent, _args, { plaidClient }) {
      const response = await plaidClient.createLinkToken({
        client_name: "Plaid Demo",
        user: {
          client_user_id: "1",
        },
        country_codes: ["US"],
        language: "en",
        products: ["transactions"],
      });

      return response.link_token;
    },
    async accessToken(_, { publicToken }, { plaidClient }) {
      const response = await plaidClient.exchangePublicToken(publicToken);
      return response.access_token;
    },
  },
  Transaction: {
    id: prop("transaction_id"),
    isoCurrencyCode: prop("iso_currency_code"),
  },
};
