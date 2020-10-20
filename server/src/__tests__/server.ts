import { ApolloServer, gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import plaid from "plaid";
import { typeDefs } from "../typeDefs";
import { resolvers } from "../resolvers";

function serverWithPlaidClientMock(
  plaidClient: Partial<plaid.Client>
): ApolloServer {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: { plaidClient },
  });
}

describe("link token query", () => {
  const linkTokenQuery = gql`
    query LinkToken {
      linkToken
    }
  `;

  it("returns a link token", async () => {
    const { query } = createTestClient(
      serverWithPlaidClientMock({
        createLinkToken() {
          return Promise.resolve<plaid.CreateLinkTokenResponse>({
            expiration: "",
            link_token: "link_token",
            request_id: "",
          });
        },
      })
    );

    const response = await query({ query: linkTokenQuery });

    expect(response.data?.linkToken).toBe("link_token");
  });
});

describe("access token query", () => {
  const accessTokenQuery = gql`
    query AccessToken($publicToken: String!) {
      accessToken(publicToken: $publicToken)
    }
  `;

  it("returns an access token", async () => {
    const { query } = createTestClient(
      serverWithPlaidClientMock({
        exchangePublicToken(publicToken: string) {
          return Promise.resolve<plaid.TokenResponse>({
            access_token: "access_token",
            item_id: "",
            request_id: "",
          });
        },
      })
    );

    const response = await query({
      query: accessTokenQuery,
      variables: { publicToken: "" },
    });

    expect(response.data?.accessToken).toBe("access_token");
  });
});

describe("accounts query", () => {
  const accountsQuery = gql`
    query Accounts($accessToken: String!) {
      accounts(accessToken: $accessToken) {
        id
        name
        type
        subtype
        balances {
          current
          isoCurrencyCode
        }
      }
    }
  `;

  it("populates expected fields", async () => {
    const { query } = createTestClient(
      serverWithPlaidClientMock({
        getAccounts(accessToken: string) {
          return Promise.resolve<plaid.AccountsResponse>({
            accounts: [
              {
                account_id: "account_id",
                balances: {
                  available: null,
                  current: 21.12,
                  iso_currency_code: "USD",
                  limit: null,
                  unofficial_currency_code: null,
                },
                mask: null,
                name: "Mock Checking",
                official_name: null,
                subtype: "subtype",
                type: "type",
                verification_status: "automatically_verified",
              },
            ],
            item: {
              available_products: [],
              billed_products: [],
              consent_expiration_time: "",
              error: null,
              institution_id: "",
              item_id: "",
              webhook: "",
            },
            request_id: "",
          });
        },
      })
    );

    const response = await query({
      query: accountsQuery,
      variables: { accessToken: "" },
    });

    expect(response.data?.accounts[0].id).toBe("account_id");
    expect(response.data?.accounts[0].name).toBe("Mock Checking");
    expect(response.data?.accounts[0].type).toBe("type");
    expect(response.data?.accounts[0].subtype).toBe("subtype");
    expect(response.data?.accounts[0].balances.current).toBe(21.12);
    expect(response.data?.accounts[0].balances.isoCurrencyCode).toBe("USD");
  });
});

describe("transactions query", () => {
  const transactionsQuery = gql`
    query Transactions($accessToken: String!, $accountID: ID!) {
      transactions(accessToken: $accessToken, accountID: $accountID) {
        id
        name
        date
        isoCurrencyCode
        amount
      }
    }
  `;

  it("populates expected fields", async () => {
    const { query } = createTestClient(
      serverWithPlaidClientMock({
        getTransactions() {
          return Promise.resolve<plaid.TransactionsResponse>({
            accounts: [],
            item: {
              available_products: [],
              billed_products: [],
              consent_expiration_time: "",
              error: null,
              institution_id: "",
              item_id: "",
              webhook: "",
            },
            request_id: "",
            total_transactions: 0,
            transactions: [
              {
                account_id: "",
                account_owner: "",
                amount: 21.12,
                authorized_date: "",
                category: null,
                category_id: null,
                date: "2021-01-01",
                iso_currency_code: "USD",
                location: {
                  address: null,
                  city: null,
                  lat: null,
                  lon: null,
                  region: null,
                  store_number: null,
                  postal_code: null,
                  country: null,
                },
                merchant_name: null,
                name: "Mock Transaction",
                payment_channel: "",
                payment_meta: {
                  by_order_of: null,
                  payee: null,
                  payer: null,
                  payment_method: null,
                  payment_processor: null,
                  ppd_id: null,
                  reason: null,
                  reference_number: null,
                },
                pending: false,
                pending_transaction_id: null,
                transaction_code: null,
                transaction_id: "transaction_id",
                transaction_type: null,
                unofficial_currency_code: null,
              },
            ],
          });
        },
      })
    );

    const response = await query({
      query: transactionsQuery,
      variables: { accessToken: "", accountID: "" },
    });

    expect(response.data?.transactions[0].id).toBe("transaction_id");
    expect(response.data?.transactions[0].name).toBe("Mock Transaction");
    expect(response.data?.transactions[0].date).toBe("2021-01-01");
    expect(response.data?.transactions[0].isoCurrencyCode).toBe("USD");
    expect(response.data?.transactions[0].amount).toBe(21.12);
  });
});
