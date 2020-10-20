/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AccountTransactions
// ====================================================

export interface AccountTransactions_transactions {
  __typename: "Transaction";
  id: string;
  name: string;
  date: string;
  isoCurrencyCode: string | null;
  amount: number;
}

export interface AccountTransactions {
  transactions: AccountTransactions_transactions[];
}

export interface AccountTransactionsVariables {
  accessToken: string;
  accountID: string;
}
