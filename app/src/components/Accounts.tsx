import { gql, useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import { Transactions } from "./Transactions";
import { GetAccounts, GetAccountsVariables } from "./__generated__/GetAccounts";

interface Props {
  accessToken: string;
}

export const query = gql`
  query GetAccounts($accessToken: String!) {
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

export const Accounts: React.FunctionComponent<Props> = ({ accessToken }) => {
  const { loading, error, data } = useQuery<GetAccounts, GetAccountsVariables>(
    query,
    { variables: { accessToken } }
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    return <>{error?.message ?? "Error"}</>;
  }

  return (
    <div>
      {data.accounts.map((account) => (
        <Accordion key={account.id}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography style={{ flex: 1 }}>{account.name}</Typography>
            <Typography>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: account.balances.isoCurrencyCode ?? "USD",
              }).format(account.balances.current)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Transactions accessToken={accessToken} accountID={account.id} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
