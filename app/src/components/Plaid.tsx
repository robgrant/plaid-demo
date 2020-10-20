import { gql, useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { PlaidLink } from "react-plaid-link";
import { Accounts } from "./Accounts";
import {
  ExchangePublicToken,
  ExchangePublicTokenVariables,
} from "./__generated__/ExchangePublicToken";
import { GetLinkToken } from "./__generated__/GetLinkToken";

const linkTokenQuery = gql`
  query GetLinkToken {
    linkToken
  }
`;

const accessTokenQuery = gql`
  query ExchangePublicToken($publicToken: String!) {
    accessToken(publicToken: $publicToken)
  }
`;

export const Plaid: React.FunctionComponent = () => {
  const { loading, error, data, client } = useQuery<GetLinkToken>(
    linkTokenQuery
  );
  const [accessToken, setAccessToken] = useState<string>();

  if (accessToken) {
    return <Accounts accessToken={accessToken} />;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    return <>{error?.message ?? "Error"}</>;
  }

  return (
    <PlaidLink
      token={data.linkToken}
      onSuccess={(publicToken: string) => {
        client
          .query<ExchangePublicToken, ExchangePublicTokenVariables>({
            query: accessTokenQuery,
            variables: { publicToken },
          })
          .then((result) => {
            if (result.data.accessToken) {
              setAccessToken(result.data.accessToken);
            }
          });
      }}
    >
      Connect a bank account
    </PlaidLink>
  );
};
