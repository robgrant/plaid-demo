/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTransactions
// ====================================================

export interface GetTransactions_transactions {
  __typename: "Transaction";
  id: string;
  name: string;
  date: string;
  isoCurrencyCode: string | null;
  amount: number;
}

export interface GetTransactions {
  transactions: GetTransactions_transactions[];
}

export interface GetTransactionsVariables {
  accessToken: string;
  accountID: string;
}
