import { gql, useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import {
  GetTransactions,
  GetTransactionsVariables,
} from "./__generated__/GetTransactions";

interface Props {
  accessToken: string;
  accountID: string;
}

export const query = gql`
  query GetTransactions($accessToken: String!, $accountID: ID!) {
    transactions(accessToken: $accessToken, accountID: $accountID) {
      id
      name
      date
      isoCurrencyCode
      amount
    }
  }
`;

export const Transactions: React.FunctionComponent<Props> = ({
  accessToken,
  accountID,
}) => {
  const { loading, error, data } = useQuery<
    GetTransactions,
    GetTransactionsVariables
  >(query, { variables: { accessToken, accountID } });

  if (loading) {
    return <Typography>Loading transaction data...</Typography>;
  }

  if (error || !data) {
    return <>{error?.message ?? "Error"}</>;
  }

  if (data.transactions.length === 0) {
    return <Typography>No transactions</Typography>;
  }

  return (
    <Table>
      <TableBody>
        {data.transactions.map((transaction) => {
          return (
            <TableRow key={transaction.id}>
              <TableCell>
                <Typography>{transaction.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{transaction.date}</Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: transaction.isoCurrencyCode ?? "USD",
                  }).format(transaction.amount)}
                </Typography>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
